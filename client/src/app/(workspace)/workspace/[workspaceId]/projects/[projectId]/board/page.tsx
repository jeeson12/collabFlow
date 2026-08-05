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
      id: "TODO",
      title: "To Do",
      color: "bg-slate-500",
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      color: "bg-blue-500",
    },
    {
      id: "DONE",
      title: "Done",
      color: "bg-green-500",
    },
  ];

  const tasks: Task[] = [
    {
      id: "1",
      ticket: "COL-101",
      title: "Implement JWT Authentication",
      description: "Complete authentication flow with refresh tokens.",
      priority: "HIGH",
      status: "TODO",
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
      status: "TODO",
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
      status: "TODO",
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
      status: "IN_PROGRESS",
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
      status: "IN_PROGRESS",
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
      status: "DONE",
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
      status: "DONE",
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
