"use client";

import { ProjectSwitcher } from "./project-switcher";
import { ProjectDetails } from "./projectDetails";
import { Profile } from "./profile";
import { NavMenu } from "./nav-menu";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceProject } from "../project-selection/api";
import { getTaskStats } from "../project/dashboard/api";
import { PanelLeftClose } from "lucide-react";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { workspaceId, projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();

  const { data: projects = [] } = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => getWorkspaceProject(workspaceId),
    enabled: !!workspaceId,
  });

  const { data: taskstats } = useQuery({
    queryKey: ["task-stats", projectId],
    queryFn: () => getTaskStats(projectId),
    enabled: !!projectId,
  });

  const { toggleSidebar } = useSidebarStore();
  const currentProject = projects.find((project) => project.id === projectId);
  return (
    <aside className="hidden md:flex sticky top-0 z-40 h-[calc(100vh-4rem)] w-72 shrink-0 border-r-0 bg-[#063325] text-slate-200 flex-col">
      {/* Project Switcher & Collapse */}
      <div className="flex items-center justify-between border-b border-white/10 p-2 gap-2">
        <div className="flex-1 overflow-hidden">
          <ProjectSwitcher />
        </div>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={toggleSidebar} 
          className="text-white hover:bg-white/10 shrink-0 h-8 w-8"
          title="Collapse Sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <NavMenu />

      {/* Project Details */}
      {currentProject && (
        <ProjectDetails
          project={currentProject}
          completionRate={
            taskstats?.total && taskstats.total > 0
              ? Math.round(
                  ((taskstats.columns.find(
                    (col) => col.name.toLowerCase() === "done",
                  )?.total ?? 0) /
                    taskstats.total) *
                    100,
                )
              : 0
          }
          totalTasks={taskstats?.total ?? 0}
        />
      )}
      {/* Push Profile to Bottom */}
      <div className="flex-1" />

      {/* Gap above profile */}
      <div className="h-4" />

      {/* Profile */}
      <Profile />
    </aside>
  );
}
