"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api/axios";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

import { Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordFormData) => {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword: data.password,
      });

      return response.data;
    },

    onSuccess: () => {
      toast.success("Password reset successfully");

      router.replace("/login");
    },


  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    resetPasswordMutation.mutate(data);
  };

  if (!token) {
    return (
      <div className="flex w-full flex-col p-4 sm:p-8">
        <div className="w-full max-w-md mx-auto mb-6 px-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#111827]/60 transition-colors hover:text-[#063325]"
          >
            <ArrowLeft className="size-4" />
            Back to login
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-md space-y-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">Invalid Reset Link</h1>

          <p className="text-sm text-muted-foreground">
            This password reset link is invalid or missing a token.
          </p>

          <Button onClick={() => router.replace("/login")}>
            Back to Login
          </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col p-4 sm:p-8">
      <div className="w-full max-w-md mx-auto mb-6 px-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#111827]/60 transition-colors hover:text-[#063325]"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-full max-w-md space-y-6 px-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Reset Password</h1>

          <p className="text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              {...form.register("password")}
            />

            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              {...form.register("confirmPassword")}
            />

            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending
              ? "Resetting password..."
              : "Reset Password"}
          </Button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
