"use client";

import { LoginFormData, loginSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect")?.startsWith("/")
    ? searchParams.get("redirect")
    : null;
  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });

      router.replace(redirect || "/workspace");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email">Email</label>

        <Input
          id="email"
          type="email"
          placeholder="enter your email"
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password">Password</label>

        <Input
          id="password"
          type="password"
          placeholder="enter your password"
          {...form.register("password")}
        />

        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
