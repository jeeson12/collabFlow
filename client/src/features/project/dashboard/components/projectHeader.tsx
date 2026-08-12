"use client";

import { Plus, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/features/project-selection/type";
import { getInitials } from "@/lib/utils";
import { ProjectMember } from "../type";

type projectHeaderProp = {
  project: Project;
  members: ProjectMember[];
  memberCount: number;
  onCreateTask: () => void;
  onInviteMember: () => void;
};

export function ProjectHeader({
  project,
  members,
  memberCount,
  onCreateTask,
  onInviteMember,
}: projectHeaderProp) {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border bg-card p-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-5">
        <Badge className="w-fit"> {project.projectKey}</Badge>

        <div>
          <h1 className="text-4xl font-bold"> {project.name}</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {members.slice(0, 4).map((member) => (
            <Avatar key={member.user.id}>
              <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
            </Avatar>
          ))}

          {memberCount > 4 && (
            <Avatar>
              <AvatarFallback>+{memberCount - 4}</AvatarFallback>
            </Avatar>
          )}

          <span className="ml-2 text-sm text-muted-foreground">
            {memberCount} Member{memberCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onCreateTask}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>

        <Button variant="outline" onClick={onInviteMember}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>
    </section>
  );
}
