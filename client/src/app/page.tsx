import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">CollabFlow</h1>

      <p className="text-muted-foreground text-center max-w-md">
        Collaborate with your team, manage projects, and track tasks from one
        place.
      </p>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </main>
  );
}
