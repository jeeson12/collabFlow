import { ProjectHero } from "@/features/project-selection/components/hero";
import { ProjectCard } from "@/features/project-selection/components/project-card";
import { CreateProjectCard } from "@/features/project-selection/components/create-project";
import { EmptyProjectState } from "@/features/project-selection/components/emptyProject";
import { ActiveMembersCard } from "@/features/project-selection/components/members";

export default function ProjectSelectionPage() {
  // Temporary until backend integration
  const hasProjects = true;

  if (!hasProjects) {
    return (
      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
        <ProjectHero />
        <EmptyProjectState />
        <ActiveMembersCard />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-8 py-8">
      {/* Hero */}
      <ProjectHero />

      {/* Projects */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />

        <CreateProjectCard />
      </section>

      {/* Workspace Members */}
      <ActiveMembersCard />
    </div>
  );
}
