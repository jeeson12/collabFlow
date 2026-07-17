"use client";
import { FolderKanban, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { workspace } from "../type";
import { useRouter } from "next/navigation";

type WorkspaceCardProps = {
  workspace: workspace;
};

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();
  return (
    <div className="rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <FolderKanban className="h-6 w-6 text-primary" />
        </div>

        <Badge>Admin</Badge>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold">{workspace.name}</h3>

        <p className="text-sm text-muted-foreground">
          Team collaboration workspace
        </p>
      </div>

      <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>12 Members</span>
        </div>

        <div className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4" />
          {workspace._count.projects}{" "}
          {workspace._count.projects === 1 ? "Project" : "Projects"}
        </div>
      </div>

      <Button
        className="mt-8 w-full justify-between"
        onClick={() => router.push(`/workspace/${workspace.id}/projects`)}
      >
        Open Workspace
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
