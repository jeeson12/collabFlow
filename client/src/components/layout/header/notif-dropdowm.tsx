"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/features/project/dashboard/api";

type Notification = {
  id: string;
  title: string;
  message: string;
  entityId?: string | null;
  entityType?: string | null;
  projectId?: string | null;
  workspaceId?: string | null;
  readAt?: string | null;
  createdAt: string;
};

type NotificationsResponse = {
  notifications: Notification[];
  unreadCount: number;
};

export function NotificationDropdown() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: getNotifications,

    // Check for new notifications automatically.
    // No more manually refreshing the page like it's 2007.
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const markReadMutation = useMutation({
    mutationFn: markNotificationAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    if (!notification.readAt) {
      markReadMutation.mutate(notification.id);
    }

    // Task notification
    if (
      notification.entityType === "TASK" &&
      notification.workspaceId &&
      notification.projectId &&
      notification.entityId
    ) {
      router.push(
        `/workspace/${notification.workspaceId}/projects/${notification.projectId}/kanban-board?task=${notification.entityId}`,
      );
      return;
    }

    // Comment / mention notification
    //
    // IMPORTANT:
    // For this to work, entityId must contain the TASK ID,
    // not the comment ID.
    if (
      notification.entityType === "COMMENT" &&
      notification.workspaceId &&
      notification.projectId &&
      notification.entityId
    ) {
      router.push(
        `/workspace/${notification.workspaceId}/projects/${notification.projectId}/kanban-board?task=${notification.entityId}`,
      );
      return;
    }

    // Project notification
    if (
      notification.entityType === "PROJECT" &&
      notification.workspaceId
    ) {
      router.push(`/workspace/${notification.workspaceId}/projects`);
      return;
    }

    // Workspace notification
    if (notification.entityType === "WORKSPACE" && notification.workspaceId) {
      router.push(`/workspace/${notification.workspaceId}`);
      return;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -right-0.5
                -top-0.5
                flex
                h-4
                min-w-4
                items-center
                justify-center
                rounded-full
                bg-green-600
                px-1
                text-[9px]
                font-bold
                leading-none
                text-white
                ring-2
                ring-background
              "
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-semibold">Notifications</h3>

          {unreadCount > 0 && (
            <button
              onClick={() => markAllReadMutation.mutate()}
              disabled={markAllReadMutation.isPending}
              className="
                text-xs
                text-primary
                hover:underline
                disabled:opacity-50
              "
            >
              Mark all as read
            </button>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Notification list */}
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type NotificationItemProps = {
  notification: Notification;
  onClick: () => void;
};

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const isUnread = !notification.readAt;

  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        flex-col
        items-start
        px-4
        py-3
        text-left
        transition
        hover:bg-muted
        ${isUnread ? "bg-muted/40" : ""}
      `}
    >
      <div className="flex w-full items-start gap-2">
        {isUnread && (
          <span
            className="
              mt-1.5
              h-2
              w-2
              shrink-0
              rounded-full
              bg-green-600
            "
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{notification.title}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {notification.message}
          </p>

          <span className="mt-1 block text-xs text-muted-foreground">
            {formatNotificationTime(notification.createdAt)}
          </span>
        </div>
      </div>
    </button>
  );
}

function formatNotificationTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const diff = Date.now() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString();
}
