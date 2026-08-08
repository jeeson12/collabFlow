import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/upate-task.dto';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private activity: ActivityService,
  ) {}
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

    if (body.assigneeId) {
      const member = await this.prisma.projectMembership.findUnique({
        where: {
          userId_projectId: {
            userId: body.assigneeId,
            projectId: body.projectId,
          },
        },
      });
      if (!member)
        throw new ForbiddenException('user is not a member of this project');
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
      if (!column) throw new NotFoundException('column not found');

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

    await this.activity.createActivity({
      userId,
      message: `created task "${body.title}"`,
      projectId: body.projectId,
    });

    return task;
  }
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
      include: {
        column: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignee: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

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

    /*
     * Validate assignee
     */
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

    /*
     * Validate column
     */
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

    await this.activity.createActivity({
      userId,
      projectId: hasTask.projectId,
      message: `updated task "${updatedTask.title}"`,
    });

    return updatedTask;
  }

  async deleteTask(id: string, userId: string) {
    const hasTask = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!hasTask) {
      throw new NotFoundException('task not found');
    }

    /*
     * Check whether requester belongs to the project
     */
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

    /*
     * Only the task creator can delete the task
     */
    if (hasTask.creatorId !== userId) {
      throw new ForbiddenException(
        'Only the task creator can delete this task',
      );
    }

    const deletedTask = await this.prisma.task.delete({
      where: {
        id,
      },
    });

    await this.activity.createActivity({
      userId,
      projectId: hasTask.projectId,
      message: `deleted task "${hasTask.title}"`,
    });

    return deletedTask;
  }

  async getTaskOverview(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) throw new NotFoundException('project not found');
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
      },
    });

    return {
      total: total,
      overdue: overdue,
      columns: columns.map((column) => ({
        id: column.id,
        order: column.order,
        name: column.name,
        total: column._count.tasks,
      })),
    };
  }

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
      orderBy: { dueDate: 'asc' },
    });
    return myTasks;
  }
}
