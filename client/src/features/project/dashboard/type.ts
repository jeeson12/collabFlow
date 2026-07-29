export interface ProjectMember {
  userId: string;
  projectId: string;
  role: "ADMIN" | "MEMBER";
  user: { id: string; name: string };
}

export interface TaskStats {
  total: number;
  overdue: number;
  todo: number;
  inprogress: number;
  completed: number;
}
