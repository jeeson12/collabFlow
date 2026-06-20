import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/upate-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(body: createTaskDto) {
    return this.prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        projectId: body.projectId,
        assigneeId: body.assigneeId,
        status: body.status,
        priority: body.priority,
      },
    });
  }
  async gettasks(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateTask(id: string, body: updateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: body });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
