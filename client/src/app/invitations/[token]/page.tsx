"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  acceptWorkspaceInvitation,
  getWorkspaceInvitation,
} from "@/features/workspace/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { handleApiError } from "@/lib/utils";
import { useAuth } from "@/features/auth/authProvider";

export default function WorkspaceInvitePage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  const { user, isLoading: authLoading } = useAuth();

  const [error, setError] = useState("");

  const token = params.token;

  const invitationQuery = useQuery({
    queryKey: ["workspace-invitation", token],
    queryFn: () => getWorkspaceInvitation(token),
    enabled: !!token,
  });

  const acceptMutation = useMutation({
    mutationFn: () => acceptWorkspaceInvitation(token),

    onSuccess: (data) => {
      router.replace(`/workspace/${data.workspaceId}/projects`);
    },

    onError: (error) => {
      setError("Unable to accept this invitation.");
      handleApiError(error);
    },
  });

  useEffect(() => {
    if (authLoading || !token) {
      return;
    }

    if (!user) {
      router.replace(
        `/login?redirect=${encodeURIComponent(`/invitations/${token}`)}`,
      );
    }
  }, [authLoading, token, user, router]);

  if (!token || authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {!token ? "Invalid invitation" : "Checking invitation..."}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              {!token
                ? "This invitation link is invalid."
                : "Please wait while we verify your account."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (invitationQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading invitation...</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verifying your workspace invitation.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (invitationQuery.isError || !invitationQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid invitation</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              This invitation is invalid, expired, or has already been accepted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const invitation = invitationQuery.data;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Workspace invitation</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-lg font-medium">{invitation.inviterName}</p>

            <p className="text-sm text-muted-foreground">invited you to join</p>

            <p className="text-xl font-semibold">{invitation.workspaceName}</p>

            <p className="text-sm text-muted-foreground">
              Role: {invitation.role}
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            className="w-full"
            onClick={() => {
              setError("");
              acceptMutation.mutate();
            }}
            disabled={acceptMutation.isPending}
          >
            {acceptMutation.isPending
              ? "Accepting invitation..."
              : "Accept invitation"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
