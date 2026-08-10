export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  hasPassword: boolean;
  avatarUrl: string | null;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export type LoginResponse = User;

export type RegisterResponse = User;
