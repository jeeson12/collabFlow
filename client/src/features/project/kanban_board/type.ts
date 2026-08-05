export type Task = {
  id: string;
  ticket: string;
  title: string;
  description?: string;
  priority: "HIGH" | "MEDIUM" | "LOW";

  column: {
    id: string;
    name: string;
  };

  assignee: string;
  initials: string;

  due: string;

  comments: number;
  attachments: number;
};

export type Column = {
  id: string;
  name: string;
  order: number;
};
