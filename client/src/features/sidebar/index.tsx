"use client";

import { ProjectSwitcher } from "./project-switcher";
import { ProjectDetails } from "./projectDetails";
import { Profile } from "./profile";
import { NavMenu } from "./nav-menu";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 border-r bg-background flex flex-col">
      {/* Project Switcher */}
      <div className="border-b p-2">
        <ProjectSwitcher />
      </div>

      {/* Navigation */}
      <NavMenu />

      {/* Project Details */}
      <ProjectDetails />

      {/* Push Profile to Bottom */}
      <div className="flex-1" />

      {/* Gap above profile */}
      <div className="h-4" />

      {/* Profile */}
      <Profile />
    </aside>
  );
}
