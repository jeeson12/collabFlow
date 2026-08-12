"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Check, KeyRound, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/features/auth/authProvider";
import { getInitials, handleApiError } from "@/lib/utils";
import { AppDialog } from "./dialogBox";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword, updateProfile } from "@/features/auth/api";

import { toast } from "sonner";
import { AvatarCropper } from "./avatar-crop-dialog";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [name, setName] = useState(user?.name ?? "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
  const [cropOpen, setCropOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = newPassword === confirmPassword;
  const isGoogleOnly = user?.hasPassword === false;

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(undefined);
      return;
    }

    const url = URL.createObjectURL(avatarFile);

    setAvatarPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const updateProfileMutation = useMutation({
    mutationFn: ({ name, file }: { name?: string; file?: File }) =>
      updateProfile(name, file),

    onSuccess: () => {
      toast.success("Profile updated successfully");

      setAvatarFile(undefined);
      setAvatarPreview(undefined);

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,

    onSuccess: () => {
      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const handleProfileSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updateProfileMutation.mutate({
      name: name.trim() || undefined,
      file: avatarFile,
    });
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!passwordsMatch) {
      return;
    }

    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Avatar must be smaller than 5MB");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
    setCropOpen(true);

    event.target.value = "";
  };

  const handleCropComplete = (file: File) => {
    setAvatarFile(file);
    setCropOpen(false);
  };

  const handleCropCancel = () => {
    setCropOpen(false);
    setAvatarPreview(undefined);
  };

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(undefined);
      return;
    }

    const url = URL.createObjectURL(avatarFile);

    setAvatarPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  return (
    <>
      <AppDialog open={open} onOpenChange={onOpenChange} title="Settings">
        <div className="space-y-8">
          {/* Profile */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Profile</h2>

              <p className="text-sm text-muted-foreground">
                Update your personal information.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-24 w-24 overflow-hidden rounded-full border bg-muted">
                      {avatarPreview || user?.avatarUrl ? (
                        <img
                          src={avatarPreview ?? user?.avatarUrl ?? undefined}
                          alt={user?.name ?? "Profile"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-medium">
                          {name ? getInitials(name) : "?"}
                        </div>
                      )}
                    </div>

                    <Input
                      ref={fileInputRef}
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />

                    <button
                      type="button"
                      aria-label="Change avatar"
                      onClick={() => fileInputRef.current?.click()}
                      className="
                        absolute bottom-0 right-0
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full border
                        bg-background shadow-sm
                        transition-colors
                        hover:bg-muted
                      "
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Upload a new profile picture.
                  </p>

                  {avatarFile && (
                    <p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">
                      {avatarFile.name}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="settings-name">Name</Label>

                  <Input
                    id="settings-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="settings-email">Email</Label>

                  <Input
                    id="settings-email"
                    type="email"
                    value={user?.email ?? ""}
                    disabled
                  />

                  <p className="text-xs text-muted-foreground">
                    Your email address cannot be changed here.
                  </p>
                </div>

                {/* Save */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                  >
                    <Check className="mr-2 h-4 w-4" />

                    {updateProfileMutation.isPending
                      ? "Saving..."
                      : "Save changes"}
                  </Button>
                </div>
              </form>
            </div>
          </section>

          <div className="border-t" />

          {/* Password */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />

                <h2 className="text-lg font-semibold">Password</h2>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {isGoogleOnly
                  ? "Your account uses Google authentication."
                  : "Change your account password."}
              </p>
            </div>

            {isGoogleOnly ? (
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="font-medium">Google authentication</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      This account does not use a CollabFlow password.
                      Authentication is handled through Google.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      window.open(
                        "https://myaccount.google.com/security",
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                  >
                    Google Account
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-6">
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>

                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>

                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="Enter your new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm new password
                    </Label>

                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm your new password"
                    />

                    {confirmPassword && !passwordsMatch && (
                      <p className="text-sm text-red-500">
                        Passwords do not match.
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={
                        !currentPassword ||
                        !newPassword ||
                        !confirmPassword ||
                        !passwordsMatch ||
                        changePasswordMutation.isPending
                      }
                    >
                      <KeyRound className="mr-2 h-4 w-4" />

                      {changePasswordMutation.isPending
                        ? "Changing..."
                        : "Change password"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </AppDialog>

      {/* Avatar cropper */}
      {avatarPreview && (
        <AvatarCropper
          open={cropOpen}
          image={avatarPreview}
          fileName={avatarFile?.name ?? "avatar.jpg"}
          onCancel={handleCropCancel}
          onComplete={handleCropComplete}
        />
      )}
    </>
  );
}
