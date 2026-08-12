"use client";

import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
  });

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("register success", data);
      router.push("/login");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const onsubmit = (data: RegisterFormData) => {
    const { confirmPass, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-xl border border-border/50 bg-white p-6 shadow-none">
        <div className="mb-7">
          <h1 className="text-2xl font-bold font-serif text-[#063325]">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to get started with CollabFlow.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPass" className="text-sm font-medium">Confirm Password</label>
            <Input
              id="confirmPass"
              type="password"
              placeholder="Confirm your password"
              {...form.register("confirmPass")}
            />
            {form.formState.errors.confirmPass && (
              <p className="text-sm text-red-500">{form.formState.errors.confirmPass.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Creating account..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
