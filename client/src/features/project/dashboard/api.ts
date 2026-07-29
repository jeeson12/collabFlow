import { Project } from "@/features/project-selection/type";
import { api } from "@/lib/api/axios";
import { ProjectMember, TaskStats } from "./type";

export async function getProject(projectId: string): Promise<Project> {
  const response = await api.get(`/project/${projectId}`);
  return response.data;
}

export async function getTaskStats(projectId: string): Promise<TaskStats> {
  const response = await api.get(`/project/${projectId}/tasks/stats`);
  return response.data;
}

export async function getMembers(
  projectId: string,
): Promise<{ members: ProjectMember[]; count: number }> {
  const response = await api.get(`/project/${projectId}/members`);
  return response.data;
}

export async function addMember(
  projectId: string,
  emailId: string,
  role: "ADMIN" | "MEMBER",
): Promise<ProjectMember> {
  return api.post(`/project/${projectId}/member`, {
    emailId,
    role,
  });
}

export async function deleteMember(
  projectId: string,
  memberId: string,
): Promise<ProjectMember> {
  const response = await api.delete(`/project/${projectId}/member/${memberId}`);
  return response.data;
}

export async function updatedMember(
  projectId: string,
  memberId: string,
  role: "ADMIN" | "MEMBER",
): Promise<ProjectMember> {
  const response = await api.patch(`/project/${projectId}/member/${memberId}`, {
    role,
  });
  return response.data;
}
