"use client";

import { KanbanColumn } from "@/features/project/kanban_board/components/kanban-Column";
import {
  Column,
  DueDateFilter,
  PriorityFilter,
  Task,
} from "@/features/project/kanban_board/type";
import { isPast, isThisWeek, isToday } from "date-fns";

type KanbanBoardProps = {
  columns: Column[];
  tasks: Task[];
  search: string;
  priority: PriorityFilter;
  dueDateFilter: DueDateFilter;
  onCreateTask: (columnId: string) => void;
};

export function KanbanBoard({
  columns,
  tasks,
  search,
  priority,
  dueDateFilter,
  onCreateTask,
}: KanbanBoardProps) {
  const query = search.trim().toLowerCase();

  return (
    <div className="flex-1 overflow-x-auto p-5">
      <div className="flex h-full w-full gap-1">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => {
            if (task.column.id !== column.id) return false;
            const matchSearch =
              query === "" ||
              task.ticketId.toLowerCase().includes(query) ||
              task.title.toLowerCase().includes(query) ||
              task.description?.toLowerCase().includes(query) ||
              task.assignee?.name.toLowerCase().includes(query);

            const matchesPriority =
              priority === "ALL" || task.priority === priority;

            let matchesDueDate = true;

            if (dueDateFilter !== "ALL") {
              if (!task.dueDate) {
                matchesDueDate = dueDateFilter === "NO_DUE_DATE";
              } else {
                const date = new Date(task.dueDate);

                switch (dueDateFilter) {
                  case "TODAY":
                    matchesDueDate = isToday(date);
                    break;

                  case "THIS_WEEK":
                    matchesDueDate = isThisWeek(date);
                    break;

                  case "OVERDUE":
                    matchesDueDate = isPast(date) && !isToday(date);
                    break;

                  case "NO_DUE_DATE":
                    matchesDueDate = false;
                    break;

                  default:
                    matchesDueDate = true;
                }
              }
            }

            return matchSearch && matchesPriority && matchesDueDate;
          });

          return (
            <KanbanColumn
              onCreateTask={onCreateTask}
              key={column.id}
              column={column}
              tasks={columnTasks}
            />
          );
        })}
      </div>
    </div>
  );
}
