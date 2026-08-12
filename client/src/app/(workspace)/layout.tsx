"use client";

import { AppHeader } from "@/components/layout/header/appHeader";
import ProtectedRoutes from "@/features/auth/protectedRoute";
import { useNotificationSocket } from "@/features/project/dashboard/hooks";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useNotificationSocket();

  return (
    <ProtectedRoutes>
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoutes>
  );
}
