"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyTasksPage() {
  const [taskFilter, setTaskFilter] = useState<"all" | "priority" | "deadline">(
    "all",
  );

  const tasks = [
    {
      title: "Authentication API",
      type: "Backend",
      priority: "HIGH",
      due: "Tomorrow",
      status: "In Progress",
      description: "Complete login flow with JWT authentication.",
    },
    {
      title: "Dashboard UI",
      type: "Frontend",
      priority: "MEDIUM",
      due: "Friday",
      status: "Todo",
      description: "Build dashboard layout and responsive cards.",
    },
    {
      title: "Payment Module",
      type: "Backend",
      priority: "HIGH",
      due: "Next Week",
      status: "Todo",
      description: "Integrate Stripe payment flow.",
    },
    {
      title: "Notification System",
      type: "Backend",
      priority: "LOW",
      due: "Next Week",
      status: "Todo",
      description: "Add toast notifications for project events.",
    },
    {
      title: "Socket Integration",
      type: "Backend",
      priority: "HIGH",
      due: "Next Week",
      status: "Todo",
      description: "Real-time updates for workspace.",
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "priority") return task.priority === "HIGH";
    if (taskFilter === "deadline")
      return (
        task.due === "Tomorrow" || task.due === "Today" || task.due === "Friday"
      );
    return true;
  });

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
                key={task.title}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border p-4 transition hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {task.due}
                    </span>
                    <span>•</span>
                    <span>{task.status}</span>
                    <span>•</span>
                    <span>{task.type}</span>
                  </div>
                </div>

                <Badge
                  variant={
                    task.priority === "HIGH"
                      ? "destructive"
                      : task.priority === "MEDIUM"
                        ? "secondary"
                        : "outline"
                  }
                >
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
