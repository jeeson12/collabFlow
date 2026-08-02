import { Action } from "sonner";

export interface ProjectMember {
  userId: string;
  projectId: string;
  role: "ADMIN" | "MEMBER";
  user: { id: string; name: string; email: string };
}

export interface TaskStats {
  total: number;
  overdue: number;
  todo: number;
  inprogress: number;
  completed: number;
}

export interface AvailableMember {
  id: string;
  name: string;
  email: string;
}

export interface Activity {
  id: string;
  message: string;

  createdAt: string;

  user: {
    id: string;
    name: string;
  };
}
