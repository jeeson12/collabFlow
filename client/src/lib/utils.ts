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

export function handleApiError(error: any) {
  toast.error(error.response?.data?.message ?? "Something went wrong");
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
