"use client";

import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProjectMember } from "../type";

type MembersCardProps = {
  members: ProjectMember[];
};

export function MembersCard({ members }: MembersCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle>Members</CardTitle>

        <Button variant="outline" size="icon" className="h-8 w-8">
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
            <div className="space-y-4">
              {members.slice(0, 5).map((member) => (
                <div
                  key={member.user.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {member.user.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">{member.user.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {member.role === "ADMIN" ? "Admin" : "Member"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4">
              <Button variant="outline" className="w-full">
                View All Members
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
