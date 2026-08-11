import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type CreateNotificationData = {
  userId: string;
  title: string;
  message: string;
  entityId?: string;
  entityType?: string;
  projectId?: string;
  workspaceId?: string;
};

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(data: CreateNotificationData) {
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        entityId: data.entityId,
        entityType: data.entityType,
        projectId: data.projectId,
        workspaceId: data.workspaceId,
      },
    });
  }

  async createMany(notifications: CreateNotificationData[]) {
    if (notifications.length === 0) {
      return;
    }

    return this.prisma.notification.createMany({
      data: notifications.map((notification) => ({
        userId: notification.userId,
        title: notification.title,
        message: notification.message,
        entityId: notification.entityId,
        entityType: notification.entityType,
        projectId: notification.projectId,
        workspaceId: notification.workspaceId,
      })),
    });
  }

  async getNotifications(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // Backfill workspaceId for legacy notifications that have a projectId
    // but were created before workspaceId was stored on notifications.
    const missingWorkspaceIds = notifications
      .filter((n) => !n.workspaceId && n.projectId)
      .map((n) => n.projectId as string);

    let projectWorkspaceMap: Record<string, string> = {};

    if (missingWorkspaceIds.length > 0) {
      const projects = await this.prisma.project.findMany({
        where: { id: { in: missingWorkspaceIds } },
        select: { id: true, workspaceId: true },
      });
      projectWorkspaceMap = Object.fromEntries(
        projects.map((p) => [p.id, p.workspaceId]),
      );
    }

    const enrichedNotifications = notifications.map((n) => ({
      ...n,
      workspaceId:
        n.workspaceId ??
        (n.projectId ? (projectWorkspaceMap[n.projectId] ?? null) : null),
    }));

    const unreadCount = await this.prisma.notification.count({
      where: {
        userId,
        readAt: null,
      },
    });

    return {
      notifications: enrichedNotifications,
      unreadCount,
    };
  }

  async markAsRead(notificationId: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  }
}
