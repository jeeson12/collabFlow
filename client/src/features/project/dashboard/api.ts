import { Project } from "@/features/project-selection/type";
import { api } from "@/lib/api/axios";
import {
  Activity,
  Attachment,
  AvailableMember,
  ProjectMember,
  TaskStats,
} from "./type";

export async function getProject(projectId: string): Promise<Project> {
  const response = await api.get(`/project/${projectId}`);
  return response.data;
}

export async function getTaskStats(projectId: string): Promise<TaskStats> {
  const response = await api.get(`/task/project/${projectId}/stats`);
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
  userId: string,
  role: "ADMIN" | "MEMBER",
): Promise<ProjectMember> {
  return api.post(`/project/${projectId}/member`, {
    userId,
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
export async function getAvailableMembers(
  projectId: string,
): Promise<AvailableMember[]> {
  const response = await api.get(`/project/${projectId}/members/available`);

  return response.data;
}

export async function getActivity(projectId: string): Promise<Activity[]> {
  const response = await api.get(`/activity/project/${projectId}`);

  return response.data;
}

export async function getRecentFiles(projectId: string): Promise<Attachment[]> {
  const response = await api.get(`/attachment/project/${projectId}/recent`);

  return response.data.files;
}

export async function getAttachmentUrl(attachmentId: string): Promise<string> {
  const response = await api.get(`/attachment/${attachmentId}/download`);

  return response.data.url;
}

export async function getNotifications() {
  const response = await api.get("/notifications");

  return response.data;
}

export async function markNotificationAsRead(notificationId: string) {
  const response = await api.patch(`/notifications/${notificationId}/read`);

  return response.data;
}

export async function markAllNotificationsAsRead() {
  const response = await api.patch("/notifications/read-all");

  return response.data;
}
