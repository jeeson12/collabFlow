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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspaceMember, updateWorkspaceMember } from "../api";
import { toast } from "sonner";
import { de } from "zod/v4/locales";

type WorkspaceMembersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  members: WorkspaceMember[];

  onOpenInvite: () => void;
};

export function WorkspaceMembersDialog({
  open,
  onOpenChange,
  members,
  workspaceId,
  onOpenInvite,
}: WorkspaceMembersDialogProps) {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.user.email.toLowerCase().includes(search.toLowerCase()) ||
      member.user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: "ADMIN" | "MEMBER";
    }) => {
      return updateWorkspaceMember(workspaceId, userId, role);
    },
    onSuccess: () => {
      toast.success("Member role updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => {
      return deleteWorkspaceMember(workspaceId, userId);
    },
    onSuccess: async () => {
      toast.success("Member deleted successfully");

      await queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["projects", workspaceId],
      });

      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "project-members",
      });

      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "available-members",
      });
    },
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Workspace Members"
      width="lg"
      headerAction={
        <Button onClick={onOpenInvite} className="pr-3">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      }
    >
      <div className="space-y-5">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members..."
        />

        <ScrollArea className="h-112.5 pr-4">
          {filteredMembers.length === 0 ? (
            <div className="flex h-87.5 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No workspace members found.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
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
                    <Select
                      value={member.role}
                      onValueChange={(value) => {
                        updateMutation.mutate({
                          userId: member.user.id,
                          role: value as "ADMIN" | "MEMBER",
                        });
                      }}
                    >
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
                      disabled={deleteMutation.isPending}
                      onClick={() => {
                        if (
                          confirm(
                            `Remove ${member.user.name} from this workspace?`,
                          )
                        ) {
                          deleteMutation.mutate(member.user.id);
                        }
                      }}
                    >
                      {deleteMutation.isPending ? (
                        <div className="animate-pulse">deleting...</div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
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
