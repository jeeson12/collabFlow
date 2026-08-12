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
    <section className="rounded-xl border border-border/50 bg-white p-6 shadow-none">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Workspace Members</h2>
          <Badge variant="secondary" className="h-6 rounded-md bg-muted px-2 font-medium">{members.length}</Badge>
        </div>

        <Button variant="ghost" size="icon" onClick={onOpenInvite} className="h-8 w-8 text-muted-foreground hover:bg-muted/50">
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
                  <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200 uppercase text-[10px]">
                    Admin
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="uppercase text-[10px]">Member</Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              variant="ghost"
              className="w-full text-foreground hover:bg-slate-50"
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
