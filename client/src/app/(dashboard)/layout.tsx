import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import ProtectedRoutes from "@/features/auth/protectedRoute";
import { ReactNode } from "react";

export default function dashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProtectedRoutes>
        <Header />
        <Sidebar />

        <main>{children}</main>
      </ProtectedRoutes>
    </>
  );
}
