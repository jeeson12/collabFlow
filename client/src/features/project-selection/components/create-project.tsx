import { Plus, FolderKanban } from "lucide-react";

export function CreateProjectCard() {
  return (
    <button
      className="
        flex h-full min-h-[320px] flex-col items-center justify-center
        rounded-2xl border-2 border-dashed
        bg-card
        transition-all duration-200
        hover:-translate-y-1
        hover:border-primary
        hover:bg-primary/5
      "
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <FolderKanban className="h-8 w-8 text-primary" />
      </div>

      <h3 className="mt-6 text-xl font-semibold">Create Project</h3>

      <p className="mt-2 max-w-[220px] text-center text-sm text-muted-foreground">
        Start a new project inside this workspace.
      </p>

      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Plus className="h-5 w-5" />
      </div>
    </button>
  );
}
