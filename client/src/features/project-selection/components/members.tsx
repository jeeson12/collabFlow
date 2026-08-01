"use client";

import { ArrowRight, Crown, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { WorkspaceMember } from "@/features/workspace/type";
import { getInitials } from "@/lib/utils";

type ActiveMembersCardProps = {
  members: WorkspaceMember[];
  onOpenMembers: () => void;
  onOpenInvite: () => void;
};

export function ActiveMembersCard({
  members,
  onOpenMembers,
  onOpenInvite,
}: ActiveMembersCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Workspace Members</h2>

          <p className="text-sm text-muted-foreground">
            Members of this workspace.
          </p>
        </div>

        <Button onClick={onOpenInvite}>
          <UserPlus className="h-4 w-4" />
        </Button>
      </div>

      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="font-medium">No members yet</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Invite members to start collaborating.
          </p>

          <Button className="mt-4" onClick={onOpenInvite}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {members.slice(0, 5).map((member) => (
              <div
                key={member.user.id}
                className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(member.user.name)}
                    </AvatarFallback>
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
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={onOpenMembers}
            >
              View All Members
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
