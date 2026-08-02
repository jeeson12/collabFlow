import { api } from "@/lib/api/axios";
import {
  createWorkspaceDto,
  updateWorkspaceDto,
  Workspace,
  WorkspaceMember,
} from "./type";

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await api.get("/workspace");
  return response.data;
}

export async function getWorkspaceById(id: string): Promise<Workspace> {
  const response = await api.get(`/workspace/${id}`);
  return response.data;
}

export async function createWorkspace(
  input: createWorkspaceDto,
): Promise<Workspace> {
  const response = await api.post("/workspace", input);
  return response.data;
}

export async function updateWorkspace(
  workspaceId: string,
  input: updateWorkspaceDto,
): Promise<Workspace> {
  const response = await api.patch(`/workspace/${workspaceId}`, input);
  return response.data;
}

export async function deleteWorkspace(workspaceId: string) {
  const response = await api.delete(`/workspace/${workspaceId}`);
  return response.data;
}

export async function getWorkspaceMembers(
  workspaceId: string,
): Promise<{ members: WorkspaceMember[]; count: number }> {
  const response = await api.get<{ members: WorkspaceMember[]; count: number }>(
    `/workspace/${workspaceId}/members`,
  );
  return response.data;
}

export async function addWorkspaceMember(
  workspaceId: string,
  email: string,
  role: "ADMIN" | "MEMBER",
): Promise<{ message: string }> {
  const response = await api.post(`/workspace/${workspaceId}/members`, {
    email,
    role,
  });
  return response.data;
}

export async function updateWorkspaceMember(
  workspaceId: string,
  userId: string,
  role: "ADMIN" | "MEMBER",
): Promise<WorkspaceMember> {
  const response = await api.patch(
    `/workspace/${workspaceId}/member/${userId}`,
    {
      role,
    },
  );
  return response.data;
}

export async function deleteWorkspaceMember(
  workspaceId: string,
  targetUserId: string,
): Promise<{ message: string }> {
  const response = await api.delete(
    `/workspace/${workspaceId}/members/${targetUserId}`,
  );
  return response.data;
}
