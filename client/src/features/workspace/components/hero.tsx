"use client";

import { useAuth } from "@/features/auth/authProvider";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="space-y-3">
      <h1 className="text-4xl font-bold font-serif text-[#063325] tracking-tight">
        Welcome back,{" "}
        <span className="italic font-medium pl-3">{user?.name}</span>
      </h1>

      <p className="max-w-2xl text-muted-foreground">
        Select a workspace to continue collaborating with your team.
      </p>
    </section>
  );
}
