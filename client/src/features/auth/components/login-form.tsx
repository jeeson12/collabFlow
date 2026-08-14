"use client";

import { useState } from "react";
import { LoginFormData, loginSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, forgotPassword } from "../api";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { getApiBaseUrl } from "@/lib/api/axios";

import { ArrowLeft, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function LoginForm() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
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
      await queryClient.fetchQuery({
        queryKey: ["profile"],
      });

      router.replace(redirect || "/workspace");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,

    onSuccess: () => {
      setEmailSent(true);
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onForgotPasswordSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data.email);
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
    setEmailSent(false);

    forgotForm.setValue("email", loginForm.getValues("email"));
  };

  const backToLogin = () => {
    setShowForgotPassword(false);
    setEmailSent(false);
    forgotForm.reset();
  };

  const loginWithGoogle = () => {
    window.location.href = `${getApiBaseUrl()}/auth/google`;
  };

  if (showForgotPassword) {
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-xl border border-border/50 bg-white p-6 shadow-none">
          {!emailSent ? (
            <>
              <button
                type="button"
                onClick={backToLogin}
                className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </button>

              <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>

                <h1 className="text-2xl font-bold font-serif text-[#063325]">
                  Forgot your password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Enter the email address associated with your account and
                  we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form
                onSubmit={forgotForm.handleSubmit(onForgotPasswordSubmit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label htmlFor="forgot-email" className="text-sm font-medium">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      {...forgotForm.register("email")}
                    />
                  </div>

                  {forgotForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {forgotForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending
                    ? "Sending reset link..."
                    : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold font-serif text-[#063325]">
                Check your email
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                If an account exists with that email address, we&apos;ve sent
                you a password reset link.
              </p>

              <div className="mt-6 rounded-xl border bg-muted/40 p-4 text-left">
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-sm font-medium">Reset link sent</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Check your inbox and spam folder. The reset link will
                      expire after 30 minutes.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full"
                onClick={backToLogin}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-xl border border-border/50 bg-white p-6 shadow-none">
        <div className="mb-7">
          <h1 className="text-2xl font-bold font-serif text-[#063325]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue to ProjectLoom.
          </p>
        </div>

        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...loginForm.register("email")}
            />

            {loginForm.formState.errors.email && (
              <p className="text-sm text-red-500">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <button
                type="button"
                onClick={openForgotPassword}
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...loginForm.register("password")}
            />

            {loginForm.formState.errors.password && (
              <p className="text-sm text-red-500">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={loginWithGoogle}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.85-1.7 2.91-4.2 2.91-7.42Z"
            />
            <path
              fill="currentColor"
              d="M12 21.9c2.64 0 4.86-.87 6.48-2.36l-3.15-2.45c-.87.58-1.98.92-3.33.92-2.56 0-4.73-1.73-5.51-4.05H3.23v2.53A9.79 9.79 0 0 0 12 21.9Z"
            />
            <path
              fill="currentColor"
              d="M6.49 13.96a5.88 5.88 0 0 1 0-3.76V7.67H3.23a9.8 9.8 0 0 0 0 8.82l3.26-2.53Z"
            />
            <path
              fill="currentColor"
              d="M12 6.15c1.44 0 2.73.5 3.75 1.49l2.81-2.81C16.86 3.22 14.64 2.1 12 2.1a9.79 9.79 0 0 0-8.77 5.57l3.26 2.53C7.27 7.88 9.44 6.15 12 6.15Z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#063325] hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
