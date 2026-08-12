"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./notif-dropdowm";
import { WorkspaceSwitcher } from "./workplaceSwitcher";
import { ProfileDropdown } from "./profile";
import { MobileSidebar } from "./mobile-sidebar";
import { useParams } from "next/navigation";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const params = useParams();
  const projectId = params?.projectId as string | undefined;
  const { isSidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex h-full items-center gap-2 md:gap-4">
          {projectId && (
            <>
              <div className="md:hidden">
                <MobileSidebar />
              </div>
              {!isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="hidden md:flex"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
            </>
          )}

          {/* Logo */}
          <Link
            href="/workspace"
            className="text-lg font-semibold tracking-[-0.035em] text-[#063325] mr-2"
          >
            CollabFlow
          </Link>
          <WorkspaceSwitcher />
          {/* Navigation */}
          <nav className="hidden sm:flex h-full items-center">
            <button className="relative flex h-full items-center px-4 text-sm font-medium text-foreground">
              Workspaces
              <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
            </button>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}

          {/* Notification */}
          <NotificationDropdown />

          {/* Avatar */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
