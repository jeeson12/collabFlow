import { api } from "@/lib/api/axios";
import { MyTask } from "./type";

export async function getMyTasks(): Promise<MyTask[]> {
  const response = await api.get("/task/my-task");

  return response.data;
}
