import { Building2, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyWorkspaceProps = {
  onCreate: () => void;
};
export function EmptyWorkspaceState({ onCreate }: EmptyWorkspaceProps) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Building2 className="h-10 w-10 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-bold tracking-tight">
          Welcome to CollabFlow 👋
        </h1>

        {/* Description */}
        <p className="mt-3 text-muted-foreground">
          You don't have any workspaces yet.
          <br />
          Create your own workspace or join an existing one to start
          collaborating.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={onCreate} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Create Workspace
          </Button>

          <Button variant="outline" size="lg">
            <Users className="mr-2 h-4 w-4" />
            Join Workspace
          </Button>
        </div>

        {/* Footer Text */}
        <p className="mt-10 text-sm text-muted-foreground">
          You can create your own workspace or accept an invitation from an
          existing team.
        </p>
      </div>
    </section>
  );
}
