export interface Project {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  projectKey: string | null;

  createdAt: string;
  updatedAt: string;
  _count: {
    memberships: number;
    tasks: number;
  };
}

export interface createProjectDto {
  name: string;
  description?: string;
  workspaceId: string;
  userId: string;
}

export interface updateProjectDto {
  name?: string;
  description?: string;
}
