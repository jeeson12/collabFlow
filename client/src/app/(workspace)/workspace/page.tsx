"use client";

import { HeroSection } from "@/features/workspace/components/hero";
import { ResumeCard } from "@/features/workspace/components/resumeCard";
import { WorkspaceCard } from "@/features/workspace/components/workspacecard";
import { CreateWorkspaceCard } from "@/features/workspace/components/createWorkspace-card";
import { useWorkspace } from "@/features/workspace/hooks";
import { EmptyWorkspaceState } from "@/features/workspace/components/empyWorkspace";

export default function WorkspacePage() {
  const { data: workspace, isLoading, isError } = useWorkspace();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }
  if (isError) {
    <div className="flex h-[60vh] items-center justify-center">
      Failed to load workspaces.
    </div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
      <HeroSection />

      <ResumeCard />

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Your Workspaces</h2>

        {workspace && workspace.length === 0 ? (
          <EmptyWorkspaceState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workspace?.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
            <CreateWorkspaceCard />
          </div>
        )}
      </section>
    </div>
  );
}
