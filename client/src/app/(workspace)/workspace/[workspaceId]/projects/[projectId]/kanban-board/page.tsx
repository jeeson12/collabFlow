"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { BoardHeader } from "@/features/project/kanban_board/components/board-header";
import { BoardToolbar } from "@/features/project/kanban_board/components/board-toolbar";
import { KanbanBoard } from "@/features/project/kanban_board/components/kanban-Board";
import { CreateTaskDialog } from "@/features/project/kanban_board/components/create-task-dialog";
import { TaskDetailsDialog } from "@/features/project/kanban_board/components/task-details/task-details-dialog";

import { getTaskOverview, getTasks } from "@/features/project/kanban_board/api";

import { getMembers, getProject } from "@/features/project/dashboard/api";

import {
  Column,
  DueDateFilter,
  PriorityFilter,
  Task,
} from "@/features/project/kanban_board/type";
import { ColumnDialog } from "@/features/project/kanban_board/components/create-column-dialog";
import {
  useCreateColumn,
  useDeleteColumn,
  useUpdateColumn,
} from "@/features/project/kanban_board/hooks";
import { ConfirmDeleteDialog } from "@/components/common/delete-confirmation";

export default function BoardPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const createColumnMutation = useCreateColumn(projectId);
  const updateColumnMutation = useUpdateColumn(projectId);
  const deleteColumnMutation = useDeleteColumn(projectId);

  const [search, setSearch] = useState("");

  const [defaultColumnId, setDefaultColumnId] = useState<string | undefined>(
    undefined,
  );

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const [priority, setPriority] = useState<PriorityFilter>("ALL");

  const [dueDate, setDueDate] = useState<DueDateFilter>("ALL");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);

  const [deleteColumnDialog, setDeleteColumnDialog] = useState<{
    open: boolean;
    column: Column | null;
  }>({
    open: false,
    column: null,
  });

  const [columnDialog, setColumnDialog] = useState<{
    open: boolean;
    mode: "create" | "edit";
    column: Column | null;
  }>({
    open: false,
    mode: "create",
    column: null,
  });
  // -----------------------------
  // Project
  // -----------------------------

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  // -----------------------------
  // Tasks
  // -----------------------------

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
  });

  // -----------------------------
  // Board overview
  // -----------------------------

  const { data: overview } = useQuery({
    queryKey: ["overview", projectId],
    queryFn: () => getTaskOverview(projectId),
  });

  // -----------------------------
  // Members
  // -----------------------------

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

  const openColumnDialog = (column?: Column) => {
    setColumnDialog({
      open: true,
      mode: column ? "edit" : "create",
      column: column ?? null,
    });
  };

  const openDeleteColumnDialog = (column: Column) => {
    setDeleteColumnDialog({
      open: true,
      column,
    });
  };

  const handleDeleteColumn = () => {
    if (!deleteColumnDialog.column) {
      return;
    }

    deleteColumnMutation.mutate(deleteColumnDialog.column.id, {
      onSuccess: () => {
        setDeleteColumnDialog({
          open: false,
          column: null,
        });
      },
    });
  };

  const handleColumnSubmit = (name: string) => {
    if (columnDialog.mode === "create") {
      createColumnMutation.mutate(name, {
        onSuccess: () => {
          setColumnDialog({
            open: false,
            mode: "create",
            column: null,
          });
        },
      });

      return;
    }

    if (!columnDialog.column) {
      return;
    }

    updateColumnMutation.mutate(
      {
        columnId: columnDialog.column.id,
        name,
      },
      {
        onSuccess: () => {
          setColumnDialog({
            open: false,
            mode: "create",
            column: null,
          });
        },
      },
    );
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTaskDetailsOpen(true);
  };

  const handleTaskDetailsOpenChange = (open: boolean) => {
    setTaskDetailsOpen(open);

    if (!open) {
      setSelectedTask(null);
    }
  };

  return (
    <div className="flex h-full flex-col">
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
        projectId={projectId}
        priority={priority}
        dueDateFilter={dueDate}
        columns={columns}
        tasks={tasks}
        search={search}
        onCreateTask={(columnId) => {
          setDefaultColumnId(columnId);
          setCreateTaskModalOpen(true);
        }}
        onTaskClick={handleTaskClick}
        onCreateColumn={() => openColumnDialog()}
        onEditColumn={(column) => openColumnDialog(column)}
        onDeleteColumn={openDeleteColumnDialog}
      />

      <TaskDetailsDialog
        open={taskDetailsOpen}
        onOpenChange={handleTaskDetailsOpenChange}
        task={selectedTask}
        columns={columns}
        assignee={assignee}
        onTaskUpdated={(updatedTask) => {
          setSelectedTask(updatedTask);
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
      <ColumnDialog
        open={columnDialog.open}
        onOpenChange={(open) =>
          setColumnDialog((prev) => ({
            ...prev,
            open,
          }))
        }
        mode={columnDialog.mode}
        column={columnDialog.column}
        onSubmit={handleColumnSubmit}
        isLoading={
          createColumnMutation.isPending || updateColumnMutation.isPending
        }
      />

      <ConfirmDeleteDialog
        open={deleteColumnDialog.open}
        onOpenChange={(open) =>
          setDeleteColumnDialog((prev) => ({
            ...prev,
            open,
          }))
        }
        title={`Delete "${deleteColumnDialog.column?.name}" column?`}
        description="This action will move all tasks in this column to the "
        onConfirm={handleDeleteColumn}
        isLoading={deleteColumnMutation.isPending}
      />
    </div>
  );
}
