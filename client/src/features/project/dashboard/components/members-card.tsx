"use client";

import { ShieldCheck, Star, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

import { ProjectMember } from "../type";

type MembersCardProps = {
  members: ProjectMember[];
  onOpenMembers: () => void;
  onOpenAddMembers: () => void;
};

export function MembersCard({
  members,
  onOpenMembers,
  onOpenAddMembers,
}: MembersCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle>Members</CardTitle>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onOpenAddMembers}
        >
          <UserPlus className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm font-medium">No members yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Invite members to start collaborating.
            </p>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {members.slice(0, 5).map((member) => (
                <div
                  key={member.user.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {getInitials(member.user.name ?? "")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium">
                          {member.user.name}
                        </p>

                        {member.role === "ADMIN" && (
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {member.role === "ADMIN" ? "Admin" : "Member"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={onOpenMembers}
              >
                View All Members
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
