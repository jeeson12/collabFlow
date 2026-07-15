"use client";

import { useAuth } from "@/features/auth/authProvider";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome back, {user?.name}! 👋
      </h1>

      <p className="max-w-2xl text-muted-foreground">
        Select a workspace to continue collaborating with your team.
      </p>
    </section>
  );
}
