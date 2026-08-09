"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
import { inviteWorkspaceMember } from "../api";
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
  const [emailId, setEmailId] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MEMBER">("MEMBER");

  const { mutate, isPending } = useMutation({
    mutationFn: () => inviteWorkspaceMember(workspaceId, emailId.trim(), role),

    onSuccess: () => {
      toast.success("Invitation sent successfully");

      setEmailId("");
      setRole("MEMBER");

      onOpenChange(false);
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const handleInvite = () => {
    const email = emailId.trim();

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    mutate();
  };

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
            type="email"
            placeholder="john@example.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>

          <Select
            value={role}
            onValueChange={(value) => setRole(value as "ADMIN" | "MEMBER")}
            disabled={isPending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="MEMBER">Member</SelectItem>

              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            disabled={!emailId.trim() || isPending}
            onClick={handleInvite}
          >
            {isPending ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
