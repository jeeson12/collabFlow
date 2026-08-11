"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getWorkspaceProject } from "@/features/project-selection/api";
import { getWorkspaceMembers } from "@/features/workspace/api";

import { ProjectHero } from "@/features/project-selection/components/hero";
import { ProjectCard } from "@/features/project-selection/components/project-card";
import { CreateProjectCard } from "@/features/project-selection/components/create-project-card";
import { EmptyProjectState } from "@/features/project-selection/components/emptyProject";
import { ActiveMembersCard } from "@/features/project-selection/components/members";
import { ProjectDialog } from "@/features/project-selection/components/project-dialog";

import { WorkspaceMembersDialog } from "@/features/workspace/components/member-dialog";

import { Project } from "./type";
import { InviteWorkspaceMemberDialog } from "../workspace/components/invite-member-dialog";

type ProjectSelectionPageProps = {
  workspaceId: string;
};

export default function ProjectSelectionPage({
  workspaceId,
}: ProjectSelectionPageProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedProject, setSelectedProject] = useState<Project>();

  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => getWorkspaceProject(workspaceId),
    enabled: !!workspaceId,
  });

  const { data } = useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId),
  });
  const members = data?.members ?? [];

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

  return (
    <>
      {projects.length === 0 ? (
        <>
          <EmptyProjectState
            onCreate={() => {
              setMode("create");
              setSelectedProject(undefined);
              setOpen(true);
            }}
          />

          <ProjectDialog
            workspaceId={workspaceId}
            open={open}
            onOpenChange={setOpen}
            mode={mode}
            project={selectedProject}
          />
        </>
      ) : (
        <>
          <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
            <ProjectHero />

            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <section className="grid gap-6 md:grid-cols-2">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={() => {
                        setMode("edit");
                        setSelectedProject(project);
                        setOpen(true);
                      }}
                    />
                  ))}

                  <CreateProjectCard
                    onClick={() => {
                      setMode("create");
                      setSelectedProject(undefined);
                      setOpen(true);
                    }}
                  />
                </section>
              </div>

              <aside className="sticky top-8 h-fit">
                <ActiveMembersCard
                  members={members}
                  onOpenMembers={() => setMembersDialogOpen(true)}
                  onOpenInvite={() => setInviteDialogOpen(true)}
                />
              </aside>
            </div>
          </div>

          <ProjectDialog
            workspaceId={workspaceId}
            open={open}
            onOpenChange={setOpen}
            mode={mode}
            project={selectedProject}
          />

          <WorkspaceMembersDialog
            workspaceId={workspaceId}
            open={membersDialogOpen}
            onOpenChange={setMembersDialogOpen}
            members={members}
            onOpenInvite={() => setInviteDialogOpen(true)}
          />

          <InviteWorkspaceMemberDialog
            open={inviteDialogOpen}
            onOpenChange={setInviteDialogOpen}
            workspaceId={workspaceId}
          />
        </>
      )}
    </>
  );
}
