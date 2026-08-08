"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import { KanbanColumn } from "@/features/project/kanban_board/components/kanban-Column";
import { TaskCard } from "@/features/project/kanban_board/components/task-card";

import {
  Column,
  DueDateFilter,
  PriorityFilter,
  Task,
} from "@/features/project/kanban_board/type";

import { isPast, isThisWeek, isToday } from "date-fns";
import { useReorderColumn, useUpdateTask } from "../hooks";

type KanbanBoardProps = {
  columns: Column[];
  tasks: Task[];
  search: string;
  priority: PriorityFilter;
  dueDateFilter: DueDateFilter;
  projectId: string;

  onCreateTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;

  onCreateColumn: () => void;
  onEditColumn: (column: Column) => void;
  onDeleteColumn: (column: Column) => void;
};

export function KanbanBoard({
  columns,
  tasks,
  search,
  priority,
  dueDateFilter,
  projectId,

  onCreateTask,
  onTaskClick,

  onCreateColumn,
  onEditColumn,
  onDeleteColumn,
}: KanbanBoardProps) {
  const query = search.trim().toLowerCase();

  const reorderColumnMutation = useReorderColumn(projectId);
  const updateTaskMutation = useUpdateTask(projectId);

  const [orderedColumns, setOrderedColumns] = useState<Column[]>([]);
  const [localTasks, setLocalTasks] = useState<Task[]>([]); // State for optimistic task updates
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [taskOverColumnId, setTaskOverColumnId] = useState<string | null>(null); // New state for dotted box

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    setOrderedColumns(columns);
  }, [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Custom collision detection for tasks vs columns
  // If a task is active, use closestCorners for precise task dropping.
  // If a column is active, use the column-specific strategy.
  // Otherwise, default to closestCorners.
  const collisionDetectionStrategy = (
    args: Parameters<typeof closestCorners>[0],
  ) => {
    if (activeColumn !== null) {
      const columnContainers = args.droppableContainers.filter(
        (container) => container.data.current?.type === "column",
      );

      const pointerCollisions = pointerWithin({
        ...args,
        droppableContainers: columnContainers,
      });

      if (pointerCollisions.length > 0) {
        return pointerCollisions;
      }

      return closestCenter({
        ...args,
        droppableContainers: columnContainers,
      });
    }

    if (activeTask !== null) {
      return closestCorners(args);
    }

    return closestCenter(args); // Default for general cases
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeType = event.active.data.current?.type;

    if (activeType === "task") {
      const task = event.active.data.current?.task;
      if (task) {
        setActiveTask(task);
      }
    }

    if (activeType === "column") {
      const column = event.active.data.current?.column;
      if (column) {
        setActiveColumn(column);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    setTaskOverColumnId(null); // Reset if not over anything valid

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "column") {
      let targetColumnId: string | undefined;

      if (overType === "column") {
        targetColumnId = over.id.toString();
      } else if (overType === "column-drop") {
        targetColumnId = over.data.current?.columnId;
      } else if (overType === "task") {
        targetColumnId = over.data.current?.task?.column?.id;
      }

      if (!targetColumnId) return;

      const activeColumnId = active.id.toString();
      if (activeColumnId === targetColumnId) return;

      setOrderedColumns((prevColumns) => {
        const oldIndex = prevColumns.findIndex((c) => c.id === activeColumnId);
        const newIndex = prevColumns.findIndex((c) => c.id === targetColumnId);

        if (oldIndex === -1 || newIndex === -1) return prevColumns;

        return arrayMove(prevColumns, oldIndex, newIndex);
      });
    }

    // Logic for task drag over a column (for dotted box indicator)
    if (activeType === "task") {
      const activeTaskData = active.data.current?.task as Task;
      if (!activeTaskData) return;

      let targetColumnId: string | null = null;

      if (overType === "column-drop") {
        targetColumnId = over.data.current?.columnId;
      } else if (overType === "task") {
        targetColumnId = over.data.current?.task?.column?.id;
      }

      // Only show indicator if dragging over a *different* column
      if (targetColumnId && targetColumnId !== activeTaskData.column.id) {
        setTaskOverColumnId(targetColumnId);
      } else {
        setTaskOverColumnId(null); // Clear indicator if over same column or invalid target
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const isColumnDrag = activeColumn !== null;

    setActiveTask(null);
    setTaskOverColumnId(null); // Clear dotted box on drag end
    setActiveColumn(null);

    if (!over) {
      if (isColumnDrag) {
        setOrderedColumns(columns);
      }
      return;
    }

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    /*
     * TASK DRAGGING
     */
    if (activeType === "task") {
      const task = active.data.current?.task as Task;
      if (!task) return;

      let targetColumnId: string | undefined;
      let targetColumnName: string | undefined;

      if (overType === "column-drop") {
        targetColumnId = over.data.current?.columnId;
        targetColumnName = orderedColumns.find(
          (col) => col.id === targetColumnId,
        )?.name;
      } else if (overType === "task") {
        targetColumnId = over.data.current?.task?.column?.id;
        targetColumnName = orderedColumns.find(
          (col) => col.id === targetColumnId,
        )?.name;
      }

      if (!targetColumnId) return;
      if (task.column.id === targetColumnId) return;

      // Optimistic UI update for tasks
      setLocalTasks((currentTasks) => {
        const updatedTasks = currentTasks.filter((t) => t.id !== task.id); // Remove task from old position
        const newColumn = orderedColumns.find((c) => c.id === targetColumnId);
        const updatedTask = {
          ...task,
          column: {
            id: targetColumnId,
            name: newColumn?.name ?? task.column.name, // Use new column name or fallback
          },
        };
        // Place at the top of the new column
        return [updatedTask, ...updatedTasks];
      });

      // Send update to backend
      updateTaskMutation.mutate({
        taskId: task.id,
        data: {
          columnId: targetColumnId,
        },
      });

      return;
    }

    /*
     * COLUMN REORDERING
     */
    if (activeType === "column" || isColumnDrag) {
      reorderColumnMutation.mutate(
        orderedColumns.map((column, index) => ({
          id: column.id,
          order: index + 1,
        })),
      );
    }
  };

  const handleDragCancel = () => {
    setOrderedColumns(columns);
    setActiveTask(null);
    setTaskOverColumnId(null); // Clear dotted box on drag cancel
    setActiveColumn(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-5 overflow-x-auto p-3 mt-1">
        <SortableContext
          items={orderedColumns.map((column) => column.id)}
          strategy={horizontalListSortingStrategy}
        >
          {orderedColumns.map((column) => {
            const columnTasks = localTasks // Use localTasks for rendering
              .filter((task) => {
                if (task.column.id !== column.id) {
                  return false;
                }

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
              })
              .sort((a, b) => {
                const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                return bTime - aTime;
              });

            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onCreateTask={onCreateTask}
                onTaskClick={onTaskClick}
                onEditColumn={onEditColumn}
                onDeleteColumn={onDeleteColumn}
                isColumnDragging={activeColumn?.id === column.id} // Only this column is dragging
                isTaskDragTarget={
                  activeTask !== null && taskOverColumnId === column.id
                } // Pass new prop
              />
            );
          })}
        </SortableContext>

        <button
          type="button"
          onClick={onCreateColumn}
          className="flex h-40 w-50 shrink-0 items-center justify-center rounded-lg border border-dashed bg-background transition-colors hover:bg-muted/50"
        >
          <span className="text-sm font-medium text-muted-foreground">
            + Create new column
          </span>
        </button>
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} onClick={() => {}} isOverlay />
        ) : activeColumn ? (
          <KanbanColumn // Drag overlay for column
            column={activeColumn}
            tasks={tasks.filter((t) => t.column.id === activeColumn.id)} // Revert to show tasks in the drag overlay
            onCreateTask={() => {}}
            onTaskClick={() => {}}
            onEditColumn={() => {}}
            onDeleteColumn={() => {}}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
