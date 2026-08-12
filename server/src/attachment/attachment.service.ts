import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Attachment } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ActivityService } from 'src/activity/activity.service';

import { randomUUID } from 'crypto';

@Injectable()
export class AttachmentService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
    private activity: ActivityService,
  ) {}

  // ---------------------------------------
  // Upload attachment
  // ---------------------------------------

  async upload(taskId: string, files: Express.Multer.File[], userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const permission = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          projectId: task.projectId,
          userId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to upload attachments to this task',
      );
    }

    const attachments: Attachment[] = [];

    for (const file of files) {
      const sanitizedFileName = file.originalname.replace(/\s+/g, '-');

      const fileName = `${randomUUID()}-${sanitizedFileName}`;

      const storagePath = `tasks/${task.id}/${fileName}`;

      const uploadedFile = await this.supabase.uploadFiles(
        storagePath,
        file.buffer,
        file.mimetype,
      );

      try {
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

        attachments.push(attachment);
      } catch (error) {
        // Prisma failed after the file was uploaded.
        // Remove the orphaned file from Supabase.
        try {
          await this.supabase.deleteFile(uploadedFile.path);
        } catch (cleanupError) {
          console.error(
            `Failed to cleanup Supabase file: ${uploadedFile.path}`,
            cleanupError,
          );
        }

        throw error;
      }
    }

    await this.activity.createActivity({
      userId,
      projectId: task.projectId,
      message: `Uploaded ${attachments.length} attachment${
        attachments.length === 1 ? '' : 's'
      } to task "${task.title}"`,
    });

    return attachments;
  }

  // ---------------------------------------
  // Get task attachments
  // ---------------------------------------

  async getAttachment(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const permission = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task.projectId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to get attachments for this task',
      );
    }

    const attachments = await this.prisma.attachment.findMany({
      where: {
        taskId,
      },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    /*
     * Generate PREVIEW URLs.
     *
     * false = don't force download.
     *
     * This allows images/PDFs/etc. to be displayed
     * directly in the frontend preview.
     */
    const attachmentsWithUrl = await Promise.all(
      attachments.map(async (attachment) => {
        const url = await this.supabase.createSignedUrl(
          attachment.storagePath,
          false,
        );

        return {
          ...attachment,
          url,
        };
      }),
    );

    return {
      attachment: attachmentsWithUrl,
      count: attachmentsWithUrl.length,
    };
  }

  // ---------------------------------------
  // Download attachment
  // ---------------------------------------

  async downloadAttachment(attachmentId: string, userId: string) {
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
          userId,
          projectId: attachment.task.projectId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to download this attachment',
      );
    }

    /*
     * true = force download.
     */
    const url = await this.supabase.createSignedUrl(
      attachment.storagePath,
      true,
    );

    return {
      url,
      fileName: attachment.originalFileName,
    };
  }

  // ---------------------------------------
  // Delete attachment
  // ---------------------------------------

  async deleteAttachment(attachmentId: string, userId: string) {
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
          userId,
          projectId: attachment.task.projectId,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to delete this attachment',
      );
    }

    const isUploader = attachment.uploadedBy === userId;
    const isAdmin = permission.role === 'ADMIN';

    if (!isUploader && !isAdmin) {
      throw new ForbiddenException(
        'Only the original uploader or a project Admin can delete this attachment',
      );
    }

    // Delete database record first.
    await this.prisma.attachment.delete({
      where: {
        id: attachmentId,
      },
    });

    // Then delete the actual file from Supabase.
    try {
      await this.supabase.deleteFile(attachment.storagePath);
    } catch (error) {
      console.error(
        `Failed to delete Supabase file: ${attachment.storagePath}`,
        error,
      );
    }

    await this.activity.createActivity({
      userId,
      projectId: attachment.task.projectId,
      message: `Deleted file ${attachment.originalFileName}`,
    });

    return {
      message: 'Attachment deleted successfully',
    };
  }
  // ---------------------------------------
  // Get recent project files
  // ---------------------------------------

  async getRecentFiles(projectId: string, userId: string) {
    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          projectId,
          userId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException(
        'You are not authorized to get recent files for this project',
      );
    }

    const files = await this.prisma.attachment.findMany({
      where: {
        task: {
          projectId,
        },
      },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    const filesWithUrl = await Promise.all(
      files.map(async (file) => {
        const url = await this.supabase.createSignedUrl(
          file.storagePath,
          false,
        );

        return {
          ...file,
          url,
        };
      }),
    );

    return {
      files: filesWithUrl,
      count: filesWithUrl.length,
    };
  }
}
