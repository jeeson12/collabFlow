export type Task = {
  id: string;
  ticket: string;
  title: string;
  description?: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";

  assignee: string;
  initials: string;

  due: string;

  comments: number;
  attachments: number;
};

export type Column = {
  id: Task["status"];
  title: string;
  color: string;
};
