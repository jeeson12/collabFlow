"use client";

import { BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type AnalyticsCardProps = {
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;
};

export function AnalyticsCard({
  completionRate,
  totalTasks,
  completedTasks,
  remainingTasks,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Completion Rate</p>

          <h2 className="mt-1 text-3xl font-bold">{completionRate}%</h2>
        </div>

        <Progress value={completionRate} />

        <div className="space-y-1 text-xs text-muted-foreground">
          <p>{totalTasks} Total Tasks</p>
          <p>{completedTasks} Completed</p>
          <p>{remainingTasks} Remaining</p>
        </div>
      </CardContent>
    </Card>
  );
}
