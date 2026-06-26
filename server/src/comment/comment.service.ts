import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCommentDto } from './dto/create-comment.dto';
import { updateCommentDto } from './dto/update-comment.dto';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activity: ActivityService,
  ) {}

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
      throw new ForbiddenException('You are not a member of this project');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: body.content,
        taskId: body.taskId,
        authorId: userId,
      },
    });
    await this.activity.createActivity({
      userId,
      projectId: task.projectId,
      message: `commented on task "${task.title}"`,
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

  async updateComment(
    body: updateCommentDto,
    userId: string,
    commentId: string,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException('comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    const updatecomment = await this.prisma.comment.update({
      where: { id: commentId },
      data: { content: body.content },
    });
    const task = await this.prisma.task.findUnique({
      where: { id: comment.taskId },
      include: { project: true },
    });

    await this.activity.createActivity({
      userId,
      projectId: task?.project.id,
      workspaceId: task?.project.workspaceId,
      message: `updated a comment on task "${task?.title}"`,
    });

    return updatecomment;
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    const task = await this.prisma.task.findUnique({
      where: { id: comment.taskId },
      include: { project: true },
    });
    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }
    await this.activity.createActivity({
      userId,
      projectId: task?.project.id,
      workspaceId: task?.project.workspaceId,
      message: `deleted a comment on task "${task?.title}"`,
    });
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return { message: 'Comment deleted successfully' };
  }
}
