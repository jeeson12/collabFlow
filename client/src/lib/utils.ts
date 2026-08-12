import { getAttachmentUrl } from "@/features/project/dashboard/api";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function handleApiError(error: unknown) {
  const apiError = error as ApiError;
  console.error("API Error caught globally:", apiError.response?.data?.message ?? apiError.message ?? String(error));
}

export async function openFiles(attachmentId: string) {
  const url = await getAttachmentUrl(attachmentId);
  window.open(url, "_blank");
}

export async function downloadFiles(attachmentId: string, fileName: string) {
  try {
    const url = await getAttachmentUrl(attachmentId);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toast.error("Failed to download file");
  }
}

export const priorityStyles = {
  HIGH: "rounded-sm border border-red-300 bg-red-100 px-2 py-0.5 text-red-700 hover:bg-red-200 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300",

  MEDIUM:
    "rounded-sm border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-yellow-800 hover:bg-yellow-200 dark:border-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300",

  LOW: "rounded-sm border border-green-300 bg-green-100 px-2 py-0.5 text-green-700 hover:bg-green-200 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300",
} as const;
