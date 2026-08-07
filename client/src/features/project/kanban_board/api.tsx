import { api } from "@/lib/api/axios";
import { CreateTaskPayload } from "./type";

export async function createTask(formData: FormData) {
  const task = await api.post("/task", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return task.data;
}

export async function getTasks(projectId: string) {
  const response = await api.get(`/task/project/${projectId}`);

  return response.data;
}

export async function getTaskOverview(projectId: string) {
  const response = await api.get(`/task/project/${projectId}/stats`);
  return response.data;
}

export async function addComment(data: { taskId: string; content: string }) {
  const response = await api.post("/comments", data);

  return response.data;
}

export async function getComments(taskId: string) {
  const response = await api.get(`/comments/task/${taskId}`);
  return response.data;
}
export async function updateComment(commentId: string, content: string) {
  const response = await api.patch(`/comments/${commentId}`, {
    content,
  });

  return response.data;
}

export async function deleteComment(commentId: string) {
  const response = await api.delete(`/comments/${commentId}`);

  return response.data;
}

export async function getAttachments(taskId: string) {
  const response = await api.get(`/attachment/task/${taskId}`);
  return response.data;
}

export async function uploadAttachment(taskId: string, files: File[]) {
  const formData = new FormData();

  formData.append("taskId", taskId);
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post(`/attachment`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function downloadAttachment(attachmentId: string) {
  const response = await api.get(`/attachment/${attachmentId}/download`);

  return response.data;
}
export async function deleteAttachment(attachmentId: string) {
  const response = await api.delete(`/attachment/${attachmentId}`);

  return response.data;
}
