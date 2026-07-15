import { HeroSection } from "@/features/workspace/components/hero";
import { ResumeCard } from "@/features/workspace/components/resumeCard";
import { WorkspaceCard } from "@/features/workspace/components/workspacecard";
import { CreateWorkspaceCard } from "@/features/workspace/components/createWorkspace-card";

export default function WorkspacePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
      <HeroSection />

      <ResumeCard />

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Your Workspaces</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <WorkspaceCard />
          <WorkspaceCard />
          <WorkspaceCard />
          <CreateWorkspaceCard />
        </div>
      </section>
    </div>
  );
}
