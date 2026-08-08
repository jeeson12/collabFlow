export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type Task = {
  id: string;
  ticketId: string;
  projectId: string;

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
    initials?: string;
  } | null;

  creator: {
    id: string;
    name: string;
    email: string;
  };

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
  dueDate?: string;
  files?: File[];
};

export type updateTaskType = {
  title?: string;
  description?: string;
  columnId?: string;
  assigneeId?: string | null;
  priority?: TaskPriority;
  dueDate?: string | null;
};

export type PriorityFilter = "ALL" | TaskPriority;

export type DueDateFilter =
  | "ALL"
  | "OVERDUE"
  | "TODAY"
  | "THIS_WEEK"
  | "NO_DUE_DATE";

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
};

export type Attachment = {
  id: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  createdAt: string;
  url?: string;
};
