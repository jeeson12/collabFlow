import { api } from "@/lib/api/axios";
import { createProjectDto, Project, updateProjectDto } from "./type";

export async function getWorkspaceProject(
  workspaceId: string,
): Promise<Project[]> {
  const response = await api.get(`/project/workspace/${workspaceId}`);
  return response.data;
}

export async function createProject(
  workspaceId: string,
  params: createProjectDto,
) {
  const response = await api.post(`/project/${workspaceId}`, params);
  return response.data;
}

export async function updateProject(
  projectId: string,
  params: updateProjectDto,
) {
  const response = await api.patch(`/project/${projectId}`, params);
  return response.data;
}

export async function deleteProject(projectId: string) {
  const response = await api.delete(`/project/${projectId}`);
  return response.data;
}
