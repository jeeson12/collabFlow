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

// Debounce tracker to prevent stacking duplicate toasts
let lastToastTime = 0;
let lastToastMessage = "";

function showToastOnce(message: string) {
  const now = Date.now();
  if (message === lastToastMessage && now - lastToastTime < 2500) {
    return;
  }
  lastToastTime = now;
  lastToastMessage = message;
  toast.error(message);
}

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // 1. Ignore canceled requests
    if (axios.isCancel(error) || error?.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const url = error.config?.url || "";

    // 2. Ignore initial profile check 401
    const isProfileCheck = url.includes("/auth/profile");
    if (status === 401 && isProfileCheck) {
      return Promise.reject(error);
    }

    // 3. ONLY show toaster messages for No Internet and Forbidden / Access Denied
    const isOffline =
      typeof navigator !== "undefined" && navigator.onLine === false;
    const isNetworkFailure =
      !status &&
      (error.code === "ERR_NETWORK" ||
        error.message === "Network Error" ||
        error.message?.includes("Network") ||
        isOffline);

    if (isNetworkFailure || isOffline) {
      showToastOnce("No internet connection. Please check your network.");
    } else if (status === 403) {
      showToastOnce("Access denied: You do not have permission to perform this action.");
    }

    // Redirect to login when an authenticated request receives a 401 response
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
