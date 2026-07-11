import { ReactNode } from "react";
import ProtectedRoutes from "@/features/auth/protectedRoute";

export default function dashboardLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}
