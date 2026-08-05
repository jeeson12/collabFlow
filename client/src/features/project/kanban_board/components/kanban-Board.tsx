"use client";

import { KanbanColumn } from "@/features/project/kanban_board/components/kanban-Column";
import { Column, Task } from "@/features/project/kanban_board/type";

type KanbanBoardProps = {
  columns: Column[];
  tasks: Task[];
  search: string;
};

export function KanbanBoard({ columns, tasks, search }: KanbanBoardProps) {
  return (
    <div className="flex-1 overflow-x-auto p-5">
      <div className="flex h-full w-max gap-5">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) =>
              task.column.id === column.id &&
              task.title.toLowerCase().includes(search.toLowerCase()),
          );

          return (
            <KanbanColumn key={column.id} column={column} tasks={columnTasks} />
          );
        })}
      </div>
    </div>
  );
}
