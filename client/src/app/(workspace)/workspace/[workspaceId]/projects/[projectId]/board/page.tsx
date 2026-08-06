"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { BoardHeader } from "@/features/project/kanban_board/components/board-header";
import { BoardToolbar } from "@/features/project/kanban_board/components/board-toolbar";
import { KanbanBoard } from "@/features/project/kanban_board/components/kanban-Board";

import { getTaskOverview, getTasks } from "@/features/project/kanban_board/api";
import { getMembers, getProject } from "@/features/project/dashboard/api";
import { CreateTaskDialog } from "@/features/project/kanban_board/components/create-task-dialog";
import {
  DueDateFilter,
  PriorityFilter,
} from "@/features/project/kanban_board/type";

export default function BoardPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [search, setSearch] = useState("");
  const [defaultColumnId, setDefaultColumnId] = useState<string>();
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const [priority, setPriority] = useState<PriorityFilter>("ALL");
  const [dueDate, setDueDate] = useState<DueDateFilter>("ALL");

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
  });

  const { data: overview } = useQuery({
    queryKey: ["overview", projectId],
    queryFn: () => getTaskOverview(projectId),
  });

  const { data: membersData } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getMembers(projectId),
  });

  const assignee =
    membersData?.members.map((member) => ({
      id: member.user.id,
      name: member.user.name,
    })) ?? [];

  const columns = overview?.columns ?? [];

  return (
    <div className="flex h-full flex-col bg-[#f7f8fa]">
      <BoardHeader
        projectName={project?.name ?? ""}
        taskCount={tasks.length}
        onCreateTask={() => {
          setDefaultColumnId(undefined);
          setCreateTaskModalOpen(true);
        }}
      />

      <div className="border-b bg-background px-8">
        <BoardToolbar
          search={search}
          onSearchChange={setSearch}
          priority={priority}
          onPriorityChange={setPriority}
          dueDateFilter={dueDate}
          onDueDateFilterChange={setDueDate}
        />
      </div>

      <KanbanBoard
        priority={priority}
        dueDateFilter={dueDate}
        columns={columns}
        tasks={tasks}
        search={search}
        onCreateTask={(columnId) => {
          setDefaultColumnId(columnId);
          setCreateTaskModalOpen(true);
        }}
      />

      <CreateTaskDialog
        open={createTaskModalOpen}
        assignee={assignee}
        onOpenChange={(open) => {
          setCreateTaskModalOpen(open);

          if (!open) {
            setDefaultColumnId(undefined);
          }
        }}
        projectId={projectId}
        columns={columns}
        defaultColumnId={defaultColumnId}
      />
    </div>
  );
}
