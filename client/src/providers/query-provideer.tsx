"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "@/lib/query/query-client";

type querryProviderProps = { children: React.ReactNode };
export function QueryProvider({ children }: querryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
