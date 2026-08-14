import axios from "axios";
import { toast } from "sonner";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    const isProfileCheck = error.config?.url?.includes("/auth/profile");

    // Handle network errors and relevant API errors.
    //
    // Do not show a toast for the initial profile check
    // returning 401. That simply means the user is logged out.
    if (
      !status ||
      ([400, 401, 403, 404, 409, 500].includes(status) &&
        !(status === 401 && isProfileCheck))
    ) {
      toast.error(message);
    }

    // Redirect to login when an authenticated request
    // receives a 401 response.
    if (status === 401 && typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (
        !currentPath.includes("/login") &&
        !currentPath.includes("/register") &&
        currentPath !== "/"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
