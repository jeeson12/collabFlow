"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  KanbanSquare,
  ListTodo,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function NavMenu() {
  return (
    <nav className="space-y-1 p-4">
      {/* Dashboard */}
      <Link href="#">
        <Button variant="secondary" className="w-full justify-start">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>

      {/* Board */}
      <Link href="#">
        <Button variant="ghost" className="w-full justify-start">
          <KanbanSquare className="mr-2 h-4 w-4" />
          Board
        </Button>
      </Link>

      {/* My Tasks */}
      <Link href="#">
        <Button variant="ghost" className="w-full justify-start">
          <ListTodo className="mr-2 h-4 w-4" />
          My Tasks
        </Button>
      </Link>

      {/* Settings */}
      <Link href="#">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </nav>
  );
}
