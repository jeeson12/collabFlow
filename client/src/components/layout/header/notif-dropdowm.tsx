"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-semibold">Notifications</h3>

          <button className="text-xs text-primary hover:underline">
            Mark all as read
          </button>
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className="h-80">
          <div className="divide-y">
            <NotificationItem
              title="Alex assigned you a task"
              time="2 min ago"
            />

            <NotificationItem
              title="Sarah commented on API task"
              time="15 min ago"
            />

            <NotificationItem
              title="Website Redesign project updated"
              time="1 hour ago"
            />

            <NotificationItem
              title="John invited you to Marketing Workspace"
              time="Yesterday"
            />
          </div>
        </ScrollArea>

        <DropdownMenuSeparator />

        <button className="w-full py-3 text-sm font-medium hover:bg-muted">
          View All Notifications
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type NotificationItemProps = {
  title: string;
  time: string;
};

function NotificationItem({ title, time }: NotificationItemProps) {
  return (
    <button className="flex w-full flex-col items-start px-4 py-3 text-left transition hover:bg-muted">
      <p className="text-sm font-medium">{title}</p>

      <span className="mt-1 text-xs text-muted-foreground">{time}</span>
    </button>
  );
}
