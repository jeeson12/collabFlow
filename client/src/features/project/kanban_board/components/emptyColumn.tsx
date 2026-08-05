"use client";

export function EmptyColumn() {
  return (
    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-muted-foreground/20 bg-background/50">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">No tasks</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Drag tasks here or create one.
        </p>
      </div>
    </div>
  );
}
