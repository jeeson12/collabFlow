import { api } from "@/lib/api/axios";
import { createWorkspaceDto, updateWorkspaceDto, workspace } from "./type";

export async function getWorkspaces(): Promise<workspace[]> {
  const response = await api.get("/workspace");
  return response.data;
}

export async function getWorkspaceById(id: string): Promise<workspace> {
  const response = await api.get(`/workspace/${id}`);
  return response.data;
}

export async function createWorkspace(
  input: createWorkspaceDto,
): Promise<workspace> {
  const response = await api.post("/workspace", input);
  return response.data;
}

export async function updateWorkspace(
  workspaceId: string,
  input: updateWorkspaceDto,
): Promise<workspace> {
  const response = await api.patch(`/workspace/${workspaceId}`, input);
  return response.data;
}

export async function deleteWorkspace(workspaceId: string) {
  const response = await api.delete(`/workspace/${workspaceId}`);
  return response.data;
}
