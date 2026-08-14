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

// Helper to format clean, user-friendly error messages
function getCleanErrorMessage(error: any): string | null {
  const status = error.response?.status;
  const data = error.response?.data;
  const rawMessage = data?.message;

  // For 500+ server errors, network disconnects, or timeouts:
  if (!status || status >= 500) {
    return "Something went wrong. Please try again.";
  }

  // Handle array of validation messages from NestJS class-validator
  if (Array.isArray(rawMessage) && rawMessage.length > 0) {
    const firstMsg = rawMessage[0];
    if (typeof firstMsg === "string" && firstMsg.length > 0) {
      return firstMsg.charAt(0).toUpperCase() + firstMsg.slice(1);
    }
  }

  // Handle specific client messages (400, 401, 403, 404, 409)
  if (typeof rawMessage === "string" && rawMessage.trim().length > 0) {
    const lower = rawMessage.toLowerCase();
    // Filter out technical or unhelpful messages
    if (
      lower.includes("internal server error") ||
      lower.includes("prisma") ||
      lower.includes("exception") ||
      lower.includes("econnrefused") ||
      lower.includes("syntaxerror") ||
      lower.includes("jwt malformed") ||
      lower.includes("invalid token")
    ) {
      return "Something went wrong. Please try again.";
    }
    return rawMessage;
  }

  // Fallback for general status codes
  if (status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (status === 404) {
    return "Resource not found.";
  }

  return "Something went wrong. Please try again.";
}

// Debounce tracker to prevent stacking duplicate toasts
let lastToastTime = 0;
let lastToastMessage = "";

function showNecessaryToast(message: string) {
  const now = Date.now();
  if (message === lastToastMessage && now - lastToastTime < 2000) {
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
    const method = (error.config?.method || "get").toLowerCase();

    // 2. Ignore initial profile check 401 (means unauthenticated)
    const isProfileCheck = url.includes("/auth/profile");
    if (status === 401 && isProfileCheck) {
      return Promise.reject(error);
    }

    // 3. Only show toast for user actions/mutations or 403 Forbidden,
    // avoiding duplicate toasts on background GET queries
    const isGetQuery = method === "get" && status !== 403;

    if (!isGetQuery && !isProfileCheck) {
      const cleanMessage = getCleanErrorMessage(error);
      if (cleanMessage) {
        showNecessaryToast(cleanMessage);
      }
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
