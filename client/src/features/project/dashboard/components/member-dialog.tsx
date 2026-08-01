"use client";

import { AppDialog } from "@/components/common/dialogBox";

import { ProjectMember } from "../type";

type ProjectMembersDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: ProjectMember[];
};

export function ProjectMembersDrawer({
  open,
  onOpenChange,
  members,
}: ProjectMembersDrawerProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Members"
      width="md"
    >
      <div className="space-y-4">
        {members.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No members found.
          </p>
        ) : (
          members.map((member) => (
            <div key={member.user.id} className="rounded-lg border p-4">
              {member.user.name}
            </div>
          ))
        )}
      </div>
    </AppDialog>
  );
}
