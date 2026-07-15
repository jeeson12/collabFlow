"use client";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "./api";

export function useWorkspace() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => getWorkspaces(),
  });
}
