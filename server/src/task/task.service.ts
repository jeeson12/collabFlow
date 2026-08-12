import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/upate-task.dto';
import { ActivityService } from 'src/activity/activity.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private activity: ActivityService,
    private readonly notification: NotificationService,
  ) {}

  // =========================================================
  // CREATE TASK
  // =========================================================

  async createTask(body: createTaskDto, userId: string) {
    const requesterMembership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: body.projectId,
        },
      },
    });

    if (!requesterMembership) {
      throw new ForbiddenException('you are not a member of this project');
    }

    const project = await this.prisma.project.findUnique({
      where: {
        id: body.projectId,
      },
      select: {
        workspaceId: true,
      },
    });

    // Validate assignee
    if (body.assigneeId) {
      const member = await this.prisma.projectMembership.findUnique({
        where: {
          userId_projectId: {
            userId: body.assigneeId,
            projectId: body.projectId,
          },
        },
      });

      if (!member) {
        throw new ForbiddenException('user is not a member of this project');
      }
    }

    const task = await this.prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: {
          id: body.projectId,
        },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const nextSequence = project.taskSequence + 1;

      const ticketId = `${project.projectKey}-${nextSequence}`;

      const column = await tx.boardColumn.findFirst({
        where: {
          id: body.columnId,
          projectId: body.projectId,
        },
      });

      if (!column) {
        throw new NotFoundException('column not found');
      }

      const createdTask = await tx.task.create({
        data: {
          title: body.title,
          description: body.description,
          projectId: body.projectId,
          assigneeId: body.assigneeId,
          creatorId: userId,
          columnId: column.id,
          priority: body.priority,
          dueDate: body.dueDate ? new Date(body.dueDate) : null,
          ticketId,
        },
      });

      await tx.project.update({
        where: {
          id: project.id,
        },
        data: {
          taskSequence: {
            increment: 1,
          },
        },
      });

      return createdTask;
    });

    // Notify assignee
    if (task.assigneeId && task.assigneeId !== userId) {
      await this.notification.createNotification({
        userId: task.assigneeId,
        title: 'Task assigned to you',
        message: `You were assigned "${task.title}"`,
        entityId: task.id,
        entityType: 'TASK',
        projectId: task.projectId,
        workspaceId: project?.workspaceId,
      });
    }

    await this.activity.createActivity({
      userId,
      message: `created task "${body.title}"`,
      projectId: body.projectId,
    });

    return task;
  }

  // =========================================================
  // GET TASKS
  // =========================================================

  async gettasks(projectId: string, userId: string) {
    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }

    return this.prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        column: true,

        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarPath: true,
          },
        },

        assignee: {
          select: {
            id: true,
            email: true,
            name: true,
            avatarPath: true,
          },
        },
      },
    });
  }

  // =========================================================
  // UPDATE TASK
  // =========================================================

  async updateTask(id: string, body: updateTaskDto, userId: string) {
    const hasTask = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!hasTask) {
      throw new NotFoundException('task not found');
    }

    const requesterMembership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: hasTask.projectId,
        },
      },
    });

    if (!requesterMembership) {
      throw new ForbiddenException('you are not a member of this project');
    }

    const taskProject = await this.prisma.project.findUnique({
      where: { id: hasTask.projectId },
      select: { workspaceId: true },
    });

    // Store old values before updating
    const oldAssigneeId = hasTask.assigneeId;
    const oldColumnId = hasTask.columnId;
    const oldDueDate = hasTask.dueDate;

    // ---------------------------------------------------------
    // Validate assignee
    // ---------------------------------------------------------

    if (body.assigneeId) {
      const member = await this.prisma.projectMembership.findUnique({
        where: {
          userId_projectId: {
            userId: body.assigneeId,
            projectId: hasTask.projectId,
          },
        },
      });

      if (!member) {
        throw new ForbiddenException('user is not a member of this project');
      }
    }

    // ---------------------------------------------------------
    // Validate column
    // ---------------------------------------------------------

    if (body.columnId) {
      const column = await this.prisma.boardColumn.findFirst({
        where: {
          id: body.columnId,
          projectId: hasTask.projectId,
        },
      });

      if (!column) {
        throw new NotFoundException('Invalid column');
      }
    }

    // ---------------------------------------------------------
    // Update task
    // ---------------------------------------------------------

    const updatedTask = await this.prisma.task.update({
      where: {
        id,
      },

      data: {
        title: body.title,
        description: body.description,
        priority: body.priority,
        columnId: body.columnId,

        /*
         * null = unassign
         * undefined = don't change
         */
        assigneeId:
          body.assigneeId === null
            ? null
            : body.assigneeId
              ? body.assigneeId
              : undefined,

        dueDate:
          body.dueDate === null
            ? null
            : body.dueDate
              ? new Date(body.dueDate)
              : undefined,
      },

      include: {
        column: true,

        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // =========================================================
    // NOTIFICATION: NEW ASSIGNEE
    // =========================================================

    if (
      updatedTask.assigneeId &&
      updatedTask.assigneeId !== oldAssigneeId &&
      updatedTask.assigneeId !== userId
    ) {
      await this.notification.createNotification({
        userId: updatedTask.assigneeId,
        title: 'Task assigned to you',
        message: `You were assigned "${updatedTask.title}"`,
        entityId: updatedTask.id,
        entityType: 'TASK',
        projectId: updatedTask.projectId,
        workspaceId: taskProject?.workspaceId,
      });
    }

    // =========================================================
    // NOTIFICATION: STATUS / COLUMN CHANGED
    // =========================================================

    if (
      updatedTask.columnId &&
      updatedTask.columnId !== oldColumnId &&
      updatedTask.assigneeId &&
      updatedTask.assigneeId !== userId
    ) {
      await this.notification.createNotification({
        userId: updatedTask.assigneeId,
        title: 'Task status changed',
        message: `The task "${updatedTask.title}" was moved to "${updatedTask.column.name}"`,
        entityId: updatedTask.id,
        entityType: 'TASK',
        projectId: updatedTask.projectId,
        workspaceId: taskProject?.workspaceId,
      });
    }

    // =========================================================
    // NOTIFICATION: DUE DATE CHANGED
    // =========================================================

    const dueDateChanged =
      updatedTask.dueDate?.getTime() !== oldDueDate?.getTime();

    if (
      dueDateChanged &&
      updatedTask.assigneeId &&
      updatedTask.assigneeId !== userId
    ) {
      await this.notification.createNotification({
        userId: updatedTask.assigneeId,
        title: 'Task due date changed',
        message: updatedTask.dueDate
          ? `The due date for "${updatedTask.title}" was changed`
          : `The due date for "${updatedTask.title}" was removed`,
        entityId: updatedTask.id,
        entityType: 'TASK',
        projectId: updatedTask.projectId,
        workspaceId: taskProject?.workspaceId,
      });
    }

    // =========================================================
    // ACTIVITY
    // =========================================================

    await this.activity.createActivity({
      userId,
      projectId: hasTask.projectId,
      message: `updated task "${updatedTask.title}"`,
    });

    return updatedTask;
  }

  // =========================================================
  // DELETE TASK
  // =========================================================

  async deleteTask(id: string, userId: string) {
    const hasTask = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!hasTask) {
      throw new NotFoundException('task not found');
    }

    const requesterMembership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: hasTask.projectId,
        },
      },
    });

    if (!requesterMembership) {
      throw new ForbiddenException('You are not a member of this project');
    }

    // Only task creator can delete
    if (hasTask.creatorId !== userId) {
      throw new ForbiddenException(
        'Only the task creator can delete this task',
      );
    }

    const deleteProject = await this.prisma.project.findUnique({
      where: { id: hasTask.projectId },
      select: { workspaceId: true },
    });

    const deletedTask = await this.prisma.task.delete({
      where: {
        id,
      },
    });

    // Notify assignee before losing the task context
    if (hasTask.assigneeId && hasTask.assigneeId !== userId) {
      await this.notification.createNotification({
        userId: hasTask.assigneeId,
        title: 'Task deleted',
        message: `The task "${hasTask.title}" was deleted`,
        entityId: hasTask.id,
        entityType: 'TASK',
        projectId: hasTask.projectId,
        workspaceId: deleteProject?.workspaceId,
      });
    }

    await this.activity.createActivity({
      userId,
      projectId: hasTask.projectId,
      message: `deleted task "${hasTask.title}"`,
    });

    return deletedTask;
  }

  // =========================================================
  // TASK OVERVIEW
  // =========================================================

  async getTaskOverview(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('project not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('you are not a member of this project');
    }

    const columns = await this.prisma.boardColumn.findMany({
      where: {
        projectId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    const total = await this.prisma.task.count({
      where: {
        projectId,
      },
    });

    const overdue = await this.prisma.task.count({
      where: {
        projectId,
        dueDate: {
          lt: new Date(),
        },
        column: {
          isCompletionColumn: false,
        },
      },
    });

    return {
      total,
      overdue,
      columns: columns.map((column) => ({
        id: column.id,
        order: column.order,
        name: column.name,
        total: column._count.tasks,
        isCompletionColumn: column.isCompletionColumn,
      })),
    };
  }

  // =========================================================
  // MY TASKS
  // =========================================================

  async getMyTasks(userId: string) {
    const myTasks = await this.prisma.task.findMany({
      where: {
        assigneeId: userId,
      },

      select: {
        id: true,
        description: true,
        title: true,

        column: {
          select: {
            id: true,
            name: true,
          },
        },

        priority: true,
        dueDate: true,
        ticketId: true,
        createdAt: true,

        project: {
          select: {
            id: true,
            name: true,
            projectKey: true,
          },
        },

        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        dueDate: 'asc',
      },
    });

    return myTasks;
  }
}
