"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getMyTasks } from "@/features/project/tasks/api";
import { formatDistanceToNow } from "date-fns";
import { priorityStyles } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

export default function MyTasksPage() {
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [taskFilter, setTaskFilter] = useState<"all" | "priority" | "deadline">(
    "all",
  );

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: getMyTasks,
  });

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "priority") return task.priority === "HIGH";
    if (taskFilter === "deadline")
      return task.dueDate && new Date(task.dueDate).getTime() > Date.now();
    return true;
  });
  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground">
          Manage and track your assigned tasks.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Assigned to Me</CardTitle>

          <div className="flex items-center gap-2 rounded-lg border p-1 bg-muted/20">
            <Button
              variant={taskFilter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTaskFilter("all")}
              className="h-8"
            >
              All
            </Button>
            <Button
              variant={taskFilter === "priority" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTaskFilter("priority")}
              className="h-8"
            >
              High Priority
            </Button>
            <Button
              variant={taskFilter === "deadline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTaskFilter("deadline")}
              className="h-8"
            >
              Deadlines
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No tasks found for this filter.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() =>
                  router.push(
                    `/workspace/${workspaceId}/projects/${task.project.id}/kanban-board?task=${task.id}`,
                  )
                }
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-3 px-1.5 transition border-t hover:bg-muted/50 cursor-pointer"
              >
                <div className="space-y-1 sm:max-w-[50%] flex-1">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {task.dueDate
                        ? formatDistanceToNow(new Date(task.dueDate), {
                            addSuffix: true,
                          })
                        : "No due date"}
                    </span>
                    <span>•</span>
                    <span>{task.column.name}</span>
                    <span>•</span>
                    <span>{task.project.name}</span>
                  </div>
                </div>

                <Badge className={priorityStyles[task.priority]}>
                  {task.priority}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
