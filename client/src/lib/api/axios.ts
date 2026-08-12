import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
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

    // Handle network errors and 4xx/5xx responses
    if (!status || ([400, 401, 403, 404, 409, 500].includes(status) && !(status === 401 && isProfileCheck))) {
      toast.error(message);
    }

    // Handle authentication errors (redirect to login if not already there)
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
