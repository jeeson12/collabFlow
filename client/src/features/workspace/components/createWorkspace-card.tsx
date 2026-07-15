import { Plus } from "lucide-react";

export function CreateWorkspaceCard() {
  return (
    <button
      className="
        flex h-full min-h-[300px] flex-col items-center justify-center
        rounded-2xl border-2 border-dashed
        bg-card
        transition-all duration-200
        hover:border-primary
        hover:bg-primary/5
        hover:-translate-y-1
      "
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Plus className="h-8 w-8 text-primary" />
      </div>

      <h3 className="mt-6 text-lg font-semibold">Create Workspace</h3>

      <p className="mt-2 max-w-[220px] text-center text-sm text-muted-foreground">
        Start a new workspace and invite your team.
      </p>
    </button>
  );
}
