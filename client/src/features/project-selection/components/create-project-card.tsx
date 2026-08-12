import { Plus, FolderKanban } from "lucide-react";

export function CreateProjectCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        flex h-full min-h-80 flex-col items-center justify-center
        rounded-xl border border-dashed border-border
        bg-white/50
        transition-all duration-200
        hover:-translate-y-1
        hover:border-[#063325]/50
        hover:bg-[#063325]/5
      "
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#063325]/10">
        <FolderKanban className="h-8 w-8 text-[#063325]" />
      </div>

      <h3 className="mt-6 text-xl font-semibold">Create Project</h3>

      <p className="mt-2 max-w-55 text-center text-sm text-muted-foreground">
        Start a new project inside this workspace.
      </p>

      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#063325] text-white">
        <Plus className="h-5 w-5" />
      </div>
    </button>
  );
}
