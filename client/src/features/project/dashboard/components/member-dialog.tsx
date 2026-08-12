"use client";

import { Trash2, Crown, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AppDialog } from "@/components/common/dialogBox";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { getInitials, handleApiError } from "@/lib/utils";
import { deleteMember, updatedMember } from "../api";
import { ProjectMember } from "../type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectMembersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: ProjectMember[];
  projectId: string;
};

export function ProjectMembersDialog({
  open,
  onOpenChange,
  members,
  projectId,
}: ProjectMembersDialogProps) {
  const queryClient = useQueryClient();

  const deleteMemberMutation = useMutation({
    mutationFn: (userId: string) => deleteMember(projectId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["available-members", projectId],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: "ADMIN" | "MEMBER";
    }) => updatedMember(projectId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Project Members"
      width="lg"
    >
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="text-lg font-semibold">No Members</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            This project doesn't have any members yet.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="font-semibold">Members</h3>

            <p className="text-sm text-muted-foreground">
              {members.length} {members.length === 1 ? "member" : "members"}
            </p>
          </div>

          <div>
            {members.map((member, index) => (
              <div key={member.user.id}>
                <div className="flex items-center justify-between py-4">
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
                      onValueChange={(value) =>
                        updateMutation.mutate({
                          userId: member.user.id,
                          role: value as "ADMIN" | "MEMBER",
                        })
                      }
                    >
                      <SelectTrigger className="w-32">
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
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={deleteMemberMutation.isPending}
                      onClick={() => {
                        if (
                          confirm(
                            `Remove ${member.user.name} from this project?`,
                          )
                        ) {
                          deleteMemberMutation.mutate(member.user.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {index !== members.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </>
      )}
    </AppDialog>
  );
}
