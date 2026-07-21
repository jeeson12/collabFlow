import { FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyProjectStateProps = {
  onCreate: () => void;
};

export function EmptyProjectState({ onCreate }: EmptyProjectStateProps) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <FolderKanban className="h-10 w-10 text-primary" />
        </div>

        <h2 className="mt-8 text-3xl font-bold">No Projects Yet</h2>

        <p className="mt-3 text-muted-foreground">
          Create your first project to start organizing tasks, files and
          collaboration.
        </p>

        <Button onClick={onCreate} className="mt-8">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
    </section>
  );
}
