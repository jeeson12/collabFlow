"use client";

import { useState } from "react";
import { Column, Task } from "@/features/project/kanban_board/type";
import { BoardHeader } from "@/features/project/kanban_board/components/board-header";
import { BoardToolbar } from "@/features/project/kanban_board/components/board-toolbar";
import { KanbanBoard } from "@/features/project/kanban_board/components/kanban-Board";

export default function BoardPage() {
  const [search, setSearch] = useState("");

  const columns: Column[] = [
    {
      id: "todo",
      name: "To Do",
      order: 1,
    },
    {
      id: "in-progress",
      name: "In Progress",
      order: 2,
    },
    {
      id: "done",
      name: "Done",
      order: 3,
    },
  ];

  const tasks: Task[] = [
    {
      id: "1",
      ticket: "COL-101",
      title: "Implement JWT Authentication",
      description: "Complete authentication flow with refresh tokens.",
      priority: "HIGH",
      column: {
        id: "todo",
        name: "To Do",
      },
      assignee: "Jeeson",
      initials: "JJ",
      due: "Tomorrow",
      comments: 4,
      attachments: 2,
    },
    {
      id: "2",
      ticket: "COL-102",
      title: "Dashboard Statistics",
      description: "Finish project statistics widgets.",
      priority: "MEDIUM",
      column: {
        id: "todo",
        name: "To Do",
      },
      assignee: "Alex",
      initials: "AL",
      due: "Friday",
      comments: 2,
      attachments: 1,
    },
    {
      id: "3",
      ticket: "COL-103",
      title: "Workspace Members",
      description: "Allow inviting workspace members.",
      priority: "LOW",
      column: {
        id: "todo",
        name: "To Do",
      },
      assignee: "Sarah",
      initials: "SA",
      due: "Next Week",
      comments: 1,
      attachments: 0,
    },
    {
      id: "4",
      ticket: "COL-104",
      title: "Notification System",
      description: "Realtime notifications using sockets.",
      priority: "HIGH",
      column: {
        id: "in-progress",
        name: "In Progress",
      },
      assignee: "Jeeson",
      initials: "JJ",
      due: "Today",
      comments: 8,
      attachments: 4,
    },
    {
      id: "5",
      ticket: "COL-105",
      title: "Dark Mode",
      description: "Theme switching with persistence.",
      priority: "MEDIUM",
      column: {
        id: "in-progress",
        name: "In Progress",
      },
      assignee: "Alex",
      initials: "AL",
      due: "Tomorrow",
      comments: 3,
      attachments: 1,
    },
    {
      id: "6",
      ticket: "COL-106",
      title: "Comments API",
      description: "CRUD for task comments.",
      priority: "LOW",
      column: {
        id: "done",
        name: "Done",
      },
      assignee: "Sarah",
      initials: "SA",
      due: "Yesterday",
      comments: 12,
      attachments: 5,
    },
    {
      id: "7",
      ticket: "COL-107",
      title: "File Upload",
      description: "Upload task attachments to Supabase.",
      priority: "HIGH",
      column: {
        id: "done",
        name: "Done",
      },
      assignee: "Jeeson",
      initials: "JJ",
      due: "Yesterday",
      comments: 7,
      attachments: 6,
    },
  ];

  return (
    <div className="flex h-full flex-col bg-[#f7f8fa]">
      <BoardHeader projectName="CollabFlow" onCreateTask={() => {}} />

      <div className="border-b bg-background px-8">
        <BoardToolbar search={search} setSearch={setSearch} />
      </div>

      <KanbanBoard columns={columns} tasks={tasks} search={search} />
    </div>
  );
}
