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

      const createdTask = await tx.task.create({
        data: {
          title: body.title,
          description: body.description,
          projectId: body.projectId,
          assigneeId: body.assigneeId,
          creatorId: userId,
          status: body.status,
          priority: body.priority,
          dueDate: body.dueDate,
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateTask(id: string, body: updateTaskDto, userId: string) {
    const hasTask = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!hasTask) throw new NotFoundException('task not found');

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

    if (body.assigneeId) {
      const member = await this.prisma.projectMembership.findUnique({
        where: {
          userId_projectId: {
            userId: body.assigneeId,
            projectId: hasTask.projectId,
          },
        },
      });
      if (!member)
        throw new ForbiddenException('user is not a member of this project');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: body,
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
      where: { id },
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
    const deletedTask = await this.prisma.task.delete({ where: { id } });
    await this.activity.createActivity({
      userId,
      projectId: hasTask.projectId,
      message: `deleted task "${hasTask.title}"`,
    });
    return deletedTask;
  }

  async getTaskStats(projectId: string, userId: string) {
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

    const statusCounts = await this.prisma.task.groupBy({
      by: ['status'],
      where: {
        projectId,
      },
      _count: {
        status: true,
      },
    });

    const stats = {
      todo: 0,
      inprogress: 0,
      completed: 0,
    };

    for (const item of statusCounts) {
      switch (item.status) {
        case 'TODO':
          stats.todo = item._count.status;
          break;
        case 'IN_PROGRESS':
          stats.inprogress = item._count.status;
          break;
        case 'DONE':
          stats.completed = item._count.status;
          break;
      }
    }
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
        status: {
          not: 'DONE',
        },
      },
    });
    const complitionRate =
      total === 0 ? 0 : Math.round((stats.completed / total) * 100);
    const remaining = total - stats.completed;
    return {
      total: total,
      overdue: overdue,
      todo: stats.todo,
      inprogress: stats.inprogress,
      completed: stats.completed,
      completionRate: complitionRate,
      remaining: remaining,
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
        status: true,
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
