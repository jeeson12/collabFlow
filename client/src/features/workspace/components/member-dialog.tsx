"use client";

import { Trash2, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { WorkspaceMember } from "../type";
import { getInitials } from "@/lib/utils";
import { AppDialog } from "@/components/common/dialogBox";

type WorkspaceMembersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  members: WorkspaceMember[];

  onOpenInvite: () => void;
};

export function WorkspaceMembersDialog({
  open,
  onOpenChange,
  members,
  onOpenInvite,
}: WorkspaceMembersDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Workspace Members"
      width="xl"
      headerAction={
        <Button onClick={onOpenInvite}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      }
    >
      <div className="space-y-5">
        <Input placeholder="Search members..." />

        <ScrollArea className="h-112.5 pr-4">
          {members.length === 0 ? (
            <div className="flex h-87.5 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No workspace members found.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.user.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-11 w-11">
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

                  <div className="flex items-center gap-3">
                    <Select defaultValue={member.role}>
                      <SelectTrigger className="w-35">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>

                        <SelectItem value="MEMBER">Member</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </AppDialog>
  );
}
