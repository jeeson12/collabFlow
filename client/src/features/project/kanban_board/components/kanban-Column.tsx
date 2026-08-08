"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Column, Task } from "@/features/project/kanban_board/type";

import { CreateTaskButton } from "./createTask-button";
import { TaskCard } from "./task-card";
import { EmptyColumn } from "./emptyColumn";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type KanbanColumnProps = {
  column: Column;
  tasks: Task[];
  onCreateTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
  onEditColumn: (column: Column) => void;
  onDeleteColumn: (column: Column) => void;
  isOverlay?: boolean;
  isColumnDragging?: boolean;
  isTaskDragTarget?: boolean; // New prop for task drop indicator
};

export function KanbanColumn({
  column,
  tasks,
  onCreateTask,
  onTaskClick,
  onEditColumn,
  onDeleteColumn,
  isOverlay = false,
  isColumnDragging = false,
  isTaskDragTarget = false, // Default to false
}: KanbanColumnProps) {
  const {
    attributes,
    setNodeRef: setSortableRef,
    transform,
    transition,
    listeners,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: isOverlay,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `column-drop-${column.id}`,
    data: {
      type: "column-drop",
      columnId: column.id,
    },
    disabled: isOverlay,
  });

  if (isOverlay) {
    return (
      <div className="flex w-75 shrink-0 flex-col rounded-lg bg-background p-3 shadow-2xl  border border-primary/40 cursor-grabbing">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{column.name}</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold shadow-sm">
              {tasks.length}
            </span>
          </div>
        </div>
        <div className="space-y-3 p-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => {}}
              isOverlay
              disableAnimation
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setSortableRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`flex w-75 shrink-0 flex-col rounded-lg bg-muted/30 p-3 transition-opacity ${
        isDragging ? "opacity-30 border-2 border-dashed border-primary" : ""
      }`}
    >
      {/* Column Header */}
      <div
        {...attributes}
        {...listeners}
        className="mb-4 flex cursor-grab items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">{column.name}</span>

          <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold shadow-sm">
            {tasks.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditColumn(column)}>
              Edit column
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDeleteColumn(column)}
            >
              Delete column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Droppable Column Area */}
      <div
        ref={setDroppableRef}
        className={`min-h-125 flex-1 rounded-lg p-2 transition-colors ${
          isOver ? "bg-primary/10 ring-2 ring-primary/30" : "" // Existing hover style
        } ${
          isTaskDragTarget && !isDragging // Show dotted box if task is dragged over and column itself isn't being dragged
            ? "border-2 border-dashed border-primary/50"
            : ""
        }`}
      >
        <div className="space-y-3">
          {/* Dotted box indicator for task drop */}
          {isTaskDragTarget && (
            <div className="h-24 w-full rounded-md border-2 border-dashed border-primary/50 bg-primary/5 opacity-70 transition-all duration-100" />
          )}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              disableAnimation={isColumnDragging}
            />
          ))}

          <CreateTaskButton onClick={() => onCreateTask(column.id)} />

          {tasks.length === 0 && <EmptyColumn />}
        </div>
      </div>
    </div>
  );
}
