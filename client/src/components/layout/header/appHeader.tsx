"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./notif-dropdowm";
import { WorkspaceSwitcher } from "./workplaceSwitcher";
import { ProfileDropdown } from "./profile";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background">
      <div className="mx-auto flex h-full items-center justify-between px-8">
        {/* Left */}
        <div className="flex h-full items-center gap-10">
          {/* Logo */}
          <Link href="/workspace" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              CF
            </div>
          </Link>
          <WorkspaceSwitcher />
          {/* Navigation */}
          <nav className="flex h-full items-center">
            <button className="relative flex h-full items-center px-4 text-sm font-medium text-foreground">
              Workspaces
              <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
            </button>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Search..." className="h-10 w-72 pl-10" />
          </div>

          {/* Notification */}
          <NotificationDropdown />

          {/* Avatar */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
