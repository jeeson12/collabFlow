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
): Promise<WorkspaceMember[]> {
  const response = await api.get<WorkspaceMember[]>(
    `/workspace/${workspaceId}/members`,
  );
  return response.data;
}
