"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";
import { Notification, NotificationsResponse } from "./type";

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const handleNotification = (notification: Notification) => {
      console.log("🔔 New notification:", notification);

      queryClient.setQueryData(["notifications"], (old: NotificationsResponse | undefined) => {
        if (!old) return old;

        return {
          ...old,
          notifications: [notification, ...old.notifications],
          unreadCount: old.unreadCount + 1,
        };
      });
    };

    socket.on("notification:new", handleNotification);

    return () => {
      socket.off("notification:new", handleNotification);
    };
  }, [queryClient]);
}
