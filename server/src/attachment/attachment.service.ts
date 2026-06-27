import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UploadAttachmentDto } from './dto/upload-attachment.dto';
import { randomUUID } from 'crypto';
import { ActivityService } from 'src/activity/activity.service';
import { count } from 'console';

@Injectable()
export class AttachmentService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
    private activity: ActivityService,
  ) {}
  async upload(
    file: Express.Multer.File,
    body: UploadAttachmentDto,
    userId: string,
  ) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: body.taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const permission = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          projectId: task.projectId,
          userId: userId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to upload attachments to this task',
      );
    }
    const sanitizedFileName = file.originalname.replace(/\s+/g, '-');
    const fileNme = `${randomUUID()}-${sanitizedFileName}`;
    const storagePath = `tasks/${task.id}/${fileNme}`;

    const uploadedFile = await this.supabase.uploadFiles(
      storagePath,
      file.buffer,
      file.mimetype,
    );

    const attachment = await this.prisma.attachment.create({
      data: {
        originalFileName: file.originalname,
        storagePath: uploadedFile.path,
        mimeType: file.mimetype,
        size: file.size,
        taskId: task.id,
        uploadedBy: userId,
      },
    });
    await this.activity.createActivity({
      userId,
      projectId: task.projectId,
      message: `Uploaded file "${file.originalname}" to task "${task.title}"`,
    });
    return attachment;
  }

  async getAttachment(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!task) {
      throw new NotFoundException('task not found');
    }

    const permission = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: task.projectId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'you are not authorized to get attachments for this task',
      );
    }

    const attachment = await this.prisma.attachment.findMany({
      where: { taskId },
      include: {
        uploader: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { attachment, count: attachment.length };
  }

  async downloadAttachent(attachmentId: string, userId: string) {
    const attachment = await this.prisma.attachment.findUnique({
      where: {
        id: attachmentId,
      },
      include: {
        task: true,
      },
    });
    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    const permission = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: attachment.task.projectId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'you are not authorized to download this attachment',
      );
    }

    const url = await this.supabase.createSignedUrl(attachment.storagePath);
    return { url };
  }

  async deleteAttachment(attachmentId: string, userId) {
    const attachment = await this.prisma.attachment.findUnique({
      where: {
        id: attachmentId,
      },
      include: {
        task: true,
      },
    });
    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    const permission = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId: attachment.uploadedBy,
          projectId: attachment.task.projectId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'you are not authorized to delete this attachment',
      );
    }

    await this.supabase.deleteFile(attachment.storagePath);
    await this.prisma.attachment.delete({
      where: { id: attachmentId },
    });

    await this.activity.createActivity({
      userId: userId,
      projectId: attachment.task.projectId,
      message: `Deleted file ${attachment.originalFileName}`,
    });
    return { message: 'Attachment deleted successfully' };
  }
}
