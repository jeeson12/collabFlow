"use client";

import { ProjectSwitcher } from "./project-switcher";
import { ProjectDetails } from "./projectDetails";
import { Profile } from "./profile";
import { NavMenu } from "./nav-menu";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceProject } from "../project-selection/api";
import { getTaskStats } from "../project/dashboard/api";

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

  const currentProject = projects.find((project) => project.id === projectId);
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 border-r-0 bg-[#063325] text-slate-200 flex flex-col">
      {/* Project Switcher */}
      <div className="border-b border-white/10 p-2">
        <ProjectSwitcher />
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
