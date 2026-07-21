"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getWorkspaceProject } from "@/features/project-selection/api";

import { ProjectHero } from "@/features/project-selection/components/hero";
import { ProjectCard } from "@/features/project-selection/components/project-card";
import { CreateProjectCard } from "@/features/project-selection/components/create-project-card";
import { EmptyProjectState } from "@/features/project-selection/components/emptyProject";
import { ActiveMembersCard } from "@/features/project-selection/components/members";
import { CreateProjectDialog } from "@/features/project-selection/components/create-project-dialog";

type ProjectSelectionPageProps = {
  workspaceId: string;
};

export default function ProjectSelectionPage({
  workspaceId,
}: ProjectSelectionPageProps) {
  const [open, setOpen] = useState(false);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => getWorkspaceProject(workspaceId),
  });

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-8 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-8 py-8">
        Failed to load projects.
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <>
        <EmptyProjectState onCreate={() => setOpen(true)} />

        <CreateProjectDialog
          workspaceId={workspaceId}
          open={open}
          onOpenChange={setOpen}
        />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
        <ProjectHero />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left Side */}
          <div>
            <section className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              <CreateProjectCard onClick={() => setOpen(true)} />
            </section>
          </div>

          {/* Right Side */}
          <aside className="sticky top-8 h-fit">
            <ActiveMembersCard workspaceId={workspaceId} />
          </aside>
        </div>
      </div>

      <CreateProjectDialog
        workspaceId={workspaceId}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
