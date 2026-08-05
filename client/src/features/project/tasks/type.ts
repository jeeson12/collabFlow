export interface MyTask {
  id: string;
  title: string;
  description: string | null;
  ticketId: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
  createdAt: string;

  project: {
    id: string;
    name: string;
    projectKey: string;
  };

  creator: {
    id: string;
    name: string | null;
  };
}
