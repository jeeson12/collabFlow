export interface workspace {
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
