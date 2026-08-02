"use client";

import {
  CheckCircle2,
  Pencil,
  Trash2,
  Activity as ActivityIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "../type";

type RecentActivityProps = {
  activities: Activity[];
  onViewAll: () => void;
};

export function RecentActivity({ activities, onViewAll }: RecentActivityProps) {
  const visibleActivities = activities.slice(0, 5);

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
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        {visibleActivities.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No recent activity.
          </div>
        ) : (
          <div className="space-y-6">
            {visibleActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                {getIcon(activity.message)}
                <div>
                  <p className="text-sm font-medium">{activity.message}</p>

                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activities.length > 5 && (
          <div className="mt-4 border-t pt-4">
            <Button variant="outline" className="w-full" onClick={onViewAll}>
              View all activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
