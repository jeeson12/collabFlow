"use client";

import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActivityType = "activity" | "success" | "warning";

type RecentActivityItem = {
  id: string;
  title: string;
  time: string;
  type: ActivityType;
};

type RecentActivityProps = {
  activities: RecentActivityItem[];
};

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: ActivityType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="mt-1 h-4 w-4 text-green-600" />;

      case "warning":
        return <AlertTriangle className="mt-1 h-4 w-4 text-orange-500" />;

      default:
        return <Activity className="mt-1 h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              {getIcon(activity.type)}

              <div>
                <p className="text-sm font-medium">{activity.title}</p>

                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4">
          <Button variant="outline" className="w-full">
            View all activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
