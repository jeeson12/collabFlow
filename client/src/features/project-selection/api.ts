import { api } from "@/lib/api/axios";
import { CreateProjectDto, Project, updateProjectDto } from "./type";

export async function getWorkspaceProject(
  workspaceId: string,
): Promise<Project[]> {
  const response = await api.get(`/project/workspace/${workspaceId}`);
  return response.data;
}

export async function createProject(params: CreateProjectDto) {
  const response = await api.post(`/project`, params);
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
