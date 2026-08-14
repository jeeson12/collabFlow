import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Reusable 3D Skeleton Card container with depth, shadow, and wave effect
 */
export function Skeleton3DCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton-3d-card p-6 transition-all", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Full page / App loading skeleton (used during initial auth check and full-screen loads)
 */
export function AppLoadingSkeleton() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top Header Skeleton */}
      <header className="flex h-14 items-center justify-between border-b bg-card/80 px-4 shadow-sm md:px-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-7 w-32 rounded-lg" />
          <Skeleton className="hidden h-8 w-44 rounded-lg sm:block" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </header>

      {/* Main Content Area Skeleton */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-9 w-64 rounded-lg" />
            <Skeleton className="h-5 w-96 max-w-full rounded-md" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton3DCard
                key={i}
                className="flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-3/5 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                </div>
                <div className="space-y-4 pt-2">
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <div className="flex items-center justify-between border-t border-black/6 pt-3 dark:border-white/6">
                    <div className="flex -space-x-2">
                      <Skeleton className="h-7 w-7 rounded-full ring-2 ring-background" />
                      <Skeleton className="h-7 w-7 rounded-full ring-2 ring-background" />
                    </div>
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                </div>
              </Skeleton3DCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Workspace List Page Skeleton (/workspace)
 */
export function WorkspaceListSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-4 md:px-8 md:py-8">
      {/* Hero Section Skeleton with 3D Depth */}
      <Skeleton3DCard className="p-6 md:p-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-56 rounded-lg md:h-10 md:w-80" />
          <Skeleton className="h-4 w-full max-w-lg rounded-md" />
        </div>
      </Skeleton3DCard>

      {/* Section Header */}
      <section className="space-y-5">
        <Skeleton className="h-7 w-48 rounded-lg" />

        {/* Grid of Workspace Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Create Workspace Card Placeholder with 3D styling */}
          <div className="skeleton-3d-card flex h-60 flex-col items-center justify-center border-dashed border-primary/20 p-6 text-center">
            <Skeleton className="mb-3 h-12 w-12 rounded-full" />
            <Skeleton className="mb-2 h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>

          {/* Existing Workspace Card Skeletons */}
          {[1, 2, 3].map((i) => (
            <Skeleton3DCard
              key={i}
              className="flex h-60 flex-col justify-between p-6"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-11 w-11 rounded-xl shadow-inner" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-36 rounded-md" />
                      <Skeleton className="h-3.5 w-20 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>

              <div className="flex items-center justify-between border-t border-black/6 pt-4 dark:border-white/6">
                <div className="flex -space-x-2">
                  <Skeleton className="h-7 w-7 rounded-full ring-2 ring-background" />
                  <Skeleton className="h-7 w-7 rounded-full ring-2 ring-background" />
                  <Skeleton className="h-7 w-7 rounded-full ring-2 ring-background" />
                </div>
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </Skeleton3DCard>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Projects Page Skeleton (/workspace/[workspaceId]/projects)
 */
export function ProjectSelectionSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-8 md:py-8">
      {/* Project Hero Skeleton with 3D Depth */}
      <Skeleton3DCard className="p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-60 rounded-lg md:h-9 md:w-72" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-36 rounded-xl shadow-sm" />
        </div>
      </Skeleton3DCard>

      {/* Main Grid + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Project Cards Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Create Project Card Placeholder */}
          <div className="skeleton-3d-card flex h-56 flex-col items-center justify-center border-dashed border-primary/20 p-6 text-center">
            <Skeleton className="mb-3 h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32 rounded-md" />
          </div>

          {[1, 2, 3].map((i) => (
            <Skeleton3DCard
              key={i}
              className="flex h-56 flex-col justify-between p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-40 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>

              <div className="space-y-2 border-t border-black/6 pt-3 dark:border-white/6">
                <div className="flex items-center justify-between text-xs">
                  <Skeleton className="h-3.5 w-16 rounded" />
                  <Skeleton className="h-3.5 w-12 rounded" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full" />
              </div>
            </Skeleton3DCard>
          ))}
        </section>

        {/* Active Members Sidebar Skeleton */}
        <aside className="sticky top-8 h-fit">
          <Skeleton3DCard className="p-5">
            <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-3 dark:border-white/6">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>
            <div className="space-y-3.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full shadow-sm" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </Skeleton3DCard>
        </aside>
      </div>
    </div>
  );
}

/**
 * Dashboard Page Skeleton (/dashboard)
 */
export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pt-6 pb-4 md:px-6">
      {/* Project Header Skeleton with 3D Depth */}
      <Skeleton3DCard className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <Skeleton className="h-8 w-64 rounded-lg md:h-9 md:w-80" />
          <Skeleton className="h-4 w-96 max-w-full rounded-md" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <Skeleton className="h-8 w-8 rounded-full ring-2 ring-background" />
            <Skeleton className="h-8 w-8 rounded-full ring-2 ring-background" />
            <Skeleton className="h-8 w-8 rounded-full ring-2 ring-background" />
          </div>
          <Skeleton className="h-9 w-28 rounded-xl shadow-sm" />
          <Skeleton className="h-9 w-28 rounded-xl shadow-sm" />
        </div>
      </Skeleton3DCard>

      {/* Masonry 3D Grid Skeleton */}
      <div className="columns-1 gap-4 gap-x-5 md:columns-2 lg:columns-3">
        {/* Task Overview Card */}
        <div className="mb-6 break-inside-avoid">
          <Skeleton3DCard className="p-5">
            <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-3 dark:border-white/6">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-xl shadow-sm" />
              <Skeleton className="h-12 w-full rounded-xl shadow-sm" />
              <Skeleton className="h-12 w-full rounded-xl shadow-sm" />
            </div>
          </Skeleton3DCard>
        </div>

        {/* Members Card */}
        <div className="mb-6 break-inside-avoid">
          <Skeleton3DCard className="p-5">
            <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-3 dark:border-white/6">
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-black/4 p-2 dark:border-white/4"
                >
                  <Skeleton className="h-9 w-9 rounded-full shadow-sm" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </Skeleton3DCard>
        </div>

        {/* Recent Activity Card */}
        <div className="mb-6 break-inside-avoid">
          <Skeleton3DCard className="p-5">
            <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-3 dark:border-white/6">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="mt-1 h-3.5 w-3.5 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </Skeleton3DCard>
        </div>

        {/* Analytics Card */}
        <div className="mb-6 break-inside-avoid">
          <Skeleton3DCard className="p-5">
            <Skeleton className="mb-4 h-5 w-36 rounded-md" />
            <div className="flex items-center justify-center py-4">
              <Skeleton className="h-32 w-32 rounded-full shadow-md" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </Skeleton3DCard>
        </div>

        {/* Files Card */}
        <div className="mb-6 break-inside-avoid">
          <Skeleton3DCard className="p-5">
            <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-3 dark:border-white/6">
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-black/6 p-2.5 shadow-sm dark:border-white/6"
                >
                  <div className="flex items-center gap-2.5">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton className="h-3.5 w-28 rounded-md" />
                      <Skeleton className="h-3 w-16 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              ))}
            </div>
          </Skeleton3DCard>
        </div>
      </div>
    </div>
  );
}

/**
 * Kanban Board Page Skeleton (/kanban-board)
 */
export function KanbanBoardSkeleton() {
  return (
    <div className="flex h-full flex-col">
      {/* Board Header Skeleton */}
      <div className="flex items-center justify-between border-b bg-card/80 px-8 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl shadow-sm" />
      </div>

      {/* Board Toolbar Skeleton */}
      <div className="border-b bg-card/60 px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-60 rounded-xl" />
            <Skeleton className="h-9 w-32 rounded-xl" />
            <Skeleton className="h-9 w-32 rounded-xl" />
          </div>
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>
      </div>

      {/* Columns & 3D Cards Container Skeleton */}
      <div className="flex flex-1 gap-6 overflow-x-auto p-8">
        {[1, 2, 3, 4].map((col) => (
          <div
            key={col}
            className="skeleton-3d-card flex w-80 shrink-0 flex-col p-4"
          >
            {/* Column Header */}
            <div className="mb-4 flex items-center justify-between border-b border-black/6 pb-3 dark:border-white/6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-4 w-6 rounded-full" />
              </div>
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>

            {/* 3D Task Card Skeletons */}
            <div className="space-y-3">
              {[1, 2, 3]
                .slice(0, col === 4 ? 1 : col === 1 ? 3 : 2)
                .map((card) => (
                  <div
                    key={card}
                    className="relative overflow-hidden rounded-xl border border-black/8 bg-background/95 p-4 shadow-md transition-all dark:border-white/8"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                        <Skeleton className="h-4 w-12 rounded-full" />
                      </div>
                      <Skeleton className="h-3 w-full rounded-md" />
                      <Skeleton className="h-3 w-3/4 rounded-md" />

                      <div className="flex items-center justify-between border-t border-black/4 pt-2 dark:border-white/4">
                        <Skeleton className="h-6 w-6 rounded-full shadow-inner" />
                        <Skeleton className="h-3 w-20 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * My Tasks Page Skeleton (/my-tasks)
 */
export function MyTasksSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-44 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      {/* 3D Card with Task List */}
      <Skeleton3DCard className="p-6">
        <div className="flex flex-col gap-4 border-b border-black/6 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/6">
          <Skeleton className="h-6 w-36 rounded-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-black/6 bg-background/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/6"
            >
              <div className="flex-1 space-y-2 sm:max-w-[60%]">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3.5 w-full rounded-md" />
                <div className="flex items-center gap-3 pt-1">
                  <Skeleton className="h-3 w-24 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </Skeleton3DCard>
    </div>
  );
}

/**
 * Dialog Member / Item List Skeleton
 */
export function MembersListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3 py-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton-3d-card flex items-center justify-between p-3"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full shadow-inner" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-3 w-36 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

/**
 * Comments List Skeleton
 */
export function CommentsListSkeleton() {
  return (
    <div className="space-y-4 py-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-3d-card flex gap-3 p-4">
          <Skeleton className="h-8 w-8 rounded-full shadow-inner" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Attachments Preview Skeleton
 */
export function AttachmentsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="skeleton-3d-card h-48 w-full p-4">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="skeleton-3d-card h-16 p-1.5">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="skeleton-3d-card h-16 p-1.5">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="skeleton-3d-card h-16 p-1.5">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
