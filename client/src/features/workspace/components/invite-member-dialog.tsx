"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDialog } from "@/components/common/dialogBox";
import { addWorkspaceMember } from "../api";
import { handleApiError } from "@/lib/utils";

type InviteWorkspaceMemberDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
};

export function InviteWorkspaceMemberDialog({
  open,
  onOpenChange,
  workspaceId,
}: InviteWorkspaceMemberDialogProps) {
  const queryClient = useQueryClient();

  const [emailId, setEmailId] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MEMBER">("MEMBER");

  const { mutate, isPending } = useMutation({
    mutationFn: () => addWorkspaceMember(workspaceId, emailId, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });

      setEmailId("");
      setRole("MEMBER");

      onOpenChange(false);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Invite Workspace Member"
      width="md"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>

          <Input
            placeholder="john@example.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>

          <Select
            value={role}
            onValueChange={(value) => setRole(value as "ADMIN" | "MEMBER")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="MEMBER">Member</SelectItem>

              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button disabled={!emailId || isPending} onClick={() => mutate()}>
            {isPending ? "Inviting..." : "Invite Member"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
