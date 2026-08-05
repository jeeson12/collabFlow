"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TaskOverviewProps = {
  totalTasks: number;
  overdueTasks: number;
  columns: {
    id: string;
    name: string;
    order: number;
    total: number;
  }[];
};

export function TaskOverview({
  totalTasks,
  overdueTasks,
  columns,
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

          {columns.map((column) => (
            <div key={column.id}>
              <p className="text-sm text-muted-foreground">{column.name}</p>
              <p className="text-2xl font-bold">{column.total}</p>
            </div>
          ))}

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
