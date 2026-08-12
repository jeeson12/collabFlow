"use client";

import { Sidebar } from "@/features/sidebar";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="bg-[#f9faf8]">
      {isSidebarOpen && <Sidebar />}

      <main 
        className={cn(
          "transition-all duration-300 min-h-[calc(100vh-4rem)]", 
          isSidebarOpen ? "md:ml-72" : "ml-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
