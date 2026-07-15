"use client";

import { LoginFormData, loginSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api";
import { useRouter } from "next/navigation";

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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      console.log("login success", data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/workspace");
    },
    onError: (error) => {
      console.log("login error", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Label htmlFor="email">email</Label>
      <div>
        <Input
          id="email"
          type="email"
          placeholder="enter your email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p>{form.formState.errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="enter your password"
          {...form.register("password")}
        />

        {form.formState.errors.password && (
          <p>{form.formState.errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
