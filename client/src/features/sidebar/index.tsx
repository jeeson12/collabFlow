"use client";

import { ProjectSwitcher } from "./project-switcher";
import { ProjectDetails } from "./projectDetails";
import { Profile } from "./profile";
import { NavMenu } from "./nav-menu";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceProject } from "../project-selection/api";

export function Sidebar() {
  const { workspaceId, projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();

  const { data: projects = [] } = useQuery({
    queryKey: ["project", workspaceId],
    queryFn: () => getWorkspaceProject(workspaceId),
  });

  const currentProject = projects.find((project) => project.id === projectId);
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 border-r bg-background flex flex-col">
      {/* Project Switcher */}
      <div className="border-b p-2">
        <ProjectSwitcher />
      </div>

      {/* Navigation */}
      <NavMenu />

      {/* Project Details */}
      {currentProject && <ProjectDetails project={currentProject} />}
      {/* Push Profile to Bottom */}
      <div className="flex-1" />

      {/* Gap above profile */}
      <div className="h-4" />

      {/* Profile */}
      <Profile />
    </aside>
  );
}
