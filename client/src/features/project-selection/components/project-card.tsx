import { FolderKanban, CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ProjectCard() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FolderKanban className="h-6 w-6 text-primary" />
          </div>

          <Badge>In Progress</Badge>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">Website Redesign</h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            Overhauling the marketing site with the new brand guidelines and
            optimized conversion paths.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Task Progress</span>

            <span>70%</span>
          </div>

          <Progress value={70} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
            <Avatar className="border-2 border-background">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>

            <Avatar className="border-2 border-background">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <Avatar className="border-2 border-background">
              <AvatarFallback>R</AvatarFallback>
            </Avatar>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold">
              +3
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />

            <span>24 / 32 Tasks</span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="flex items-center gap-2 border-t px-6 py-4 text-sm text-muted-foreground">
        <Clock3 className="h-4 w-4" />

        <span>Sarah updated "Hero Section" 2h ago</span>
      </div>
    </div>
  );
}
