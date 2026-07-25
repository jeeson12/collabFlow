"use client";

import { CircleDot } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Project } from "../project-selection/type";

type projectDetailsProps = { project: Project };
export function ProjectDetails({ project }: projectDetailsProps) {
  return (
    <div className="mx-4 mt-2 rounded-xl border bg-muted/40 p-2">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Current Project
      </p>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">{project.name}</h3>

          <p className="text-sm text-muted-foreground">
            {" "}
            {project.projectKey ?? "PROJECT"}
          </p>
        </div>

        <Badge variant="secondary" className="w-fit gap-1">
          <CircleDot className="size-3 fill-green-500 text-green-500" />
          Active
        </Badge>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>

            <span>68%</span>
          </div>

          <Progress value={68} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Members</span>

          <span className="font-medium"> {project._count.memberships}</span>
        </div>
      </div>
    </div>
  );
}
