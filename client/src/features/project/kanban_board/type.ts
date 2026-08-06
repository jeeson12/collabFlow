export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type Task = {
  id: string;

  ticketId: string;

  title: string;

  description?: string | null;

  priority: TaskPriority;

  column: {
    id: string;
    name: string;
  };

  assignee?: {
    id: string;
    name: string;
    initials: string;
  } | null;

  dueDate?: string | null;

  comments: number;

  attachments: number;
};

export type Column = {
  id: string;
  name: string;
  order: number;
};

export type CreateTaskPayload = {
  title: string;

  description?: string;

  projectId: string;

  columnId: string;

  assigneeId?: string;

  priority?: TaskPriority;

  dueDate?: Date;
};

export type PriorityFilter = "ALL" | TaskPriority;

export type DueDateFilter =
  | "ALL"
  | "OVERDUE"
  | "TODAY"
  | "THIS_WEEK"
  | "NO_DUE_DATE";
