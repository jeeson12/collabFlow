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
    <div className="flex min-h-full bg-[#f9faf8]">
      {isSidebarOpen && <Sidebar />}

      <div 
        className={cn(
          "flex-1 transition-all duration-300 min-w-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
