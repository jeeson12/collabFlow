import { Project } from "@/features/project-selection/type";
import { api } from "@/lib/api/axios";
import { ProjectMember, TaskStats } from "./type";

export async function getProject(projectId: string): Promise<Project> {
  const response = await api.get(`/project/${projectId}`);
  return response.data;
}

export async function getMembers(
  projectId: string,
): Promise<{ members: ProjectMember[]; count: number }> {
  const response = await api.get(`/project/${projectId}/members`);
  return response.data;
}

export async function getTaskStats(projectId: string): Promise<TaskStats> {
  const response = await api.get(`/project/${projectId}/tasks/stats`);
  return response.data;
}
