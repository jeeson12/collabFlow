import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(body: createCommentDto, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: body.taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const member = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: task.projectId,
        },
      },
    });
    if (!member) {
      throw new NotFoundException('You are not a member of this project');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: body.content,
        taskId: body.taskId,
        authorId: userId,
      },
    });
    return comment;
  }

  async getComment(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('task not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: { userId_projectId: { userId, projectId: task.projectId } },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }
    const comment = await this.prisma.comment.findMany({
      where: { taskId },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
    return { comment, count: comment.length };
  }
}
