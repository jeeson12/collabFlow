"use client";

import {
  Activity as ActivityIcon,
  CheckCircle2,
  Pencil,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Activity } from "../type";
import { AppDialog } from "@/components/common/dialogBox";

type ActivityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activities: Activity[];
};

export function ActivityDialog({
  open,
  onOpenChange,
  activities,
}: ActivityDialogProps) {
  const getIcon = (message: string) => {
    const text = message.toLowerCase();

    if (text.includes("created") || text.includes("added")) {
      return <CheckCircle2 className="mt-1 h-4 w-4 text-green-600" />;
    }

    if (text.includes("removed") || text.includes("deleted")) {
      return <Trash2 className="mt-1 h-4 w-4 text-red-500" />;
    }

    if (text.includes("changed") || text.includes("updated")) {
      return <Pencil className="mt-1 h-4 w-4 text-blue-500" />;
    }

    return <ActivityIcon className="mt-1 h-4 w-4 text-muted-foreground" />;
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Project Activity"
      description={`${activities.length} activities`}
      width="lg"
    >
      {activities.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          No activity found.
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 border-b pb-5 last:border-b-0 last:pb-0"
            >
              {getIcon(activity.message)}

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium wrap-break-word">
                  {activity.message}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.user.name} •{" "}
                  {formatDistanceToNow(new Date(activity.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppDialog>
  );
}
