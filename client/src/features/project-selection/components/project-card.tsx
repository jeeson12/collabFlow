import { FolderKanban, CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Project } from "../type";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-4 p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FolderKanban className="h-5 w-5 text-primary" />
          </div>

          <Badge className="text-xs">{project.projectKey ?? "PROJECT"}</Badge>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-semibold">{project.name}</h3>

          <p className="line-clamp-2 text-xs text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span>Progress</span>
            <span>0%</span>
          </div>

          <Progress value={0} className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Avatar className="h-8 w-8 border border-background">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>0 / {project._count.tasks}</span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="flex items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
        <Clock3 className="h-3.5 w-3.5" />
        <span>No recent activity</span>
      </div>
    </div>
  );
}
