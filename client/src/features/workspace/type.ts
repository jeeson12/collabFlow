export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    projects: number;
  };
}

export interface createWorkspaceDto {
  name: string;
}

export interface updateWorkspaceDto {
  name: string;
}

export interface WorkspaceMember {
  id: string;
  role: "ADMIN" | "MEMBER";

  user: {
    id: string;
    name: string;
    email: string;
  };
}
