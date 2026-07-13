import { api } from "@/lib/api/axios";
import {
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
  User,
} from "./type";

export async function login(input: LoginDto): Promise<LoginResponse> {
  const response = await api.post("/auth/login", input);
  return response.data;
}

export async function getProfile(): Promise<User> {
  const response = await api.get("/auth/profile");
  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");
  return response.data;
}

export async function register(input: RegisterDto): Promise<RegisterResponse> {
  const response = await api.post("/auth/register", input);
  return response.data;
}
