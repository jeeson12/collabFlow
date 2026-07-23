"use client";

import { useState } from "react";

import { HeroSection } from "@/features/workspace/components/hero";
import { ResumeCard } from "@/features/workspace/components/resumeCard";
import { WorkspaceCard } from "@/features/workspace/components/workspacecard";
import { CreateWorkspaceCard } from "@/features/workspace/components/createWorkspace-card";
import { EmptyWorkspaceState } from "@/features/workspace/components/empyWorkspace";
import { WorkspaceDialog } from "@/features/workspace/components/workspaceDialog";

import { useWorkspace } from "@/features/workspace/hooks";
import { Workspace } from "@/features/workspace/type";

export default function WorkspacePage() {
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

  const { data: workspaces = [], isLoading, isError } = useWorkspace();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Failed to load workspaces.
      </div>
    );
  }

  return (
    <>
      {workspaces.length === 0 ? (
        <EmptyWorkspaceState
          onCreate={() => {
            setMode("create");
            setSelectedWorkspace(undefined);
            setOpen(true);
          }}
        />
      ) : (
        <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
          <HeroSection />

          <section>
            <h2 className="mb-5 text-2xl font-semibold">Your Workspaces</h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {workspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  // You'll use this later
                  onEdit={() => {
                    setMode("edit");
                    setSelectedWorkspace(workspace);
                    setOpen(true);
                  }}
                />
              ))}

              <CreateWorkspaceCard
                onClick={() => {
                  setMode("create");
                  setSelectedWorkspace(undefined);
                  setOpen(true);
                }}
              />
            </div>
          </section>
        </div>
      )}

      <WorkspaceDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        workspace={selectedWorkspace}
      />
    </>
  );
}
