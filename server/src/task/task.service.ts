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

    const task = await this.prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        projectId: body.projectId,
        assigneeId: body.assigneeId,
        creatorId: userId,
        status: body.status,
        priority: body.priority,
        dueDate: body.dueDate,
      },
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
}
