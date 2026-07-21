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

export interface CreateProjectDto {
  workspaceId: string;
  name: string;
  projectKey: string;
  description?: string;
}

export interface updateProjectDto {
  name?: string;
  description?: string;
  projectKey?: string;
}
