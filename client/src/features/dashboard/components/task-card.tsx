"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TaskOverviewProps = {
  totalTasks: number;
  completedTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
};

export function TaskOverview({
  totalTasks,
  completedTasks,
  todoTasks,
  inProgressTasks,
  overdueTasks,
}: TaskOverviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Task Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Todo</p>
            <p className="text-2xl font-bold">{todoTasks}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold">{inProgressTasks}</p>
          </div>

          <div className="col-span-2 mt-2">
            <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Overdue Tasks
              </span>

              <span className="font-bold text-red-600 dark:text-red-400">
                {overdueTasks}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
