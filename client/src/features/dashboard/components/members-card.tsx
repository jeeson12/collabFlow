"use client";

import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Member = {
  id: string;
  name: string;
  role: string;
};

type MembersCardProps = {
  members: Member[];
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
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium">{member.name}</p>

                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4">
          <Button variant="outline" className="w-full">
            View all members
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
