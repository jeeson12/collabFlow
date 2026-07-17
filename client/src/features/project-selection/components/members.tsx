"use client";

import { ArrowRight, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getWorkspaceMembers } from "@/features/workspace/api";
import { WorkspaceMember } from "@/features/workspace/type";
import { getInitials } from "@/lib/utils";

type ActiveMembersCardProps = {
  workspaceId: string;
};

export function ActiveMembersCard({ workspaceId }: ActiveMembersCardProps) {
  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId),
  });

  if (isLoading) {
    return (
      <section className="rounded-2xl border bg-card p-6">
        Loading members...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-2xl border bg-card p-6">
        Failed to load members.
      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Workspace Members</h2>
          <p className="text-sm text-muted-foreground">
            Members of this workspace.
          </p>
        </div>

        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.user.id}
            className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{member.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {member.user.email}
                </p>
              </div>
            </div>

            {member.role === "ADMIN" ? (
              <Badge>
                <Crown className="mr-1 h-3 w-3" />
                Admin
              </Badge>
            ) : (
              <Badge variant="secondary">Member</Badge>
            )}
          </div>
        ))}

        {members.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No members found.
          </p>
        )}
      </div>
    </section>
  );
}
