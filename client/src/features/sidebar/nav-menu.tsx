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
          variant="ghost"
          className={`w-full justify-start ${
            pathname ===
            `/workspace/${workspaceId}/projects/${projectId}/dashboard`
              ? "bg-white/10 text-white hover:bg-white/20 hover:text-white"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
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
          variant="ghost"
          className={`w-full justify-start ${
            pathname ===
            `/workspace/${workspaceId}/projects/${projectId}/kanban-board`
              ? "bg-white/10 text-white hover:bg-white/20 hover:text-white"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <KanbanSquare className="mr-2 h-4 w-4" />
          Board
        </Button>
      </Link>

      {/* My Tasks */}
      <Link href={`/workspace/${workspaceId}/projects/${projectId}/my-tasks`}>
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            pathname ===
            `/workspace/${workspaceId}/projects/${projectId}/my-tasks`
              ? "bg-white/10 text-white hover:bg-white/20 hover:text-white"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <ListTodo className="mr-2 h-4 w-4" />
          My Tasks
        </Button>
      </Link>
    </nav>
  );
}
