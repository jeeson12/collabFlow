"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  KanbanSquare,
  ListTodo,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useParams, usePathname } from "next/navigation";

export function NavMenu() {
  const { workspaceId, projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-4">
      {/* Dashboard */}
      <Link href={`/workspace/${workspaceId}/projects/${projectId}/dashboard`}>
        <Button
          variant={
            pathname ===
            `/workspace/${workspaceId}/projects/${projectId}/dashboard`
              ? "default"
              : "ghost"
          }
          className="w-full justify-start"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>

      {/* Board */}
      <Link
        href={`/workspace/${workspaceId}/projects/${projectId}/kanban-board`}
      >
        <Button
          variant={
            pathname ===
            `/workspace/${workspaceId}/projects/${projectId}/kanban-board`
              ? "default"
              : "ghost"
          }
          className="w-full justify-start"
        >
          <KanbanSquare className="mr-2 h-4 w-4" />
          Board
        </Button>
      </Link>

      {/* My Tasks */}
      <Link href={`/workspace/${workspaceId}/projects/${projectId}/my-tasks`}>
        <Button
          variant={
            pathname ===
            `/workspace/${workspaceId}/projects/${projectId}/my-tasks`
              ? "default"
              : "ghost"
          }
          className="w-full justify-start"
        >
          <ListTodo className="mr-2 h-4 w-4" />
          My Tasks
        </Button>
      </Link>
    </nav>
  );
}
