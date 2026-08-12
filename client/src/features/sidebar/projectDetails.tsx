"use client";

import { CircleDot } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Project } from "../project-selection/type";

type ProjectDetailsProps = {
  project: Project;
  completionRate: number;
  totalTasks: number;
};

export function ProjectDetails({
  project,
  completionRate,
  totalTasks,
}: ProjectDetailsProps) {
  return (
    <div className="mx-4 mt-2 rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Current Project
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-white">{project.name}</h3>

          <p className="text-sm text-slate-400">{project.projectKey}</p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Progress</span>

            <span className="font-medium">{completionRate}%</span>
          </div>

          <Progress
            value={completionRate}
            className="h-2 bg-transparent border-1 border-white"
            indicatorClassName="bg-white rounded"
          />
        </div>

        <div className="space-y-2 text-sm text-white">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Members</span>

            <span className="font-medium">{project._count.memberships}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Tasks</span>

            <span className="font-medium">{totalTasks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
