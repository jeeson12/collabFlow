import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-neutral-300/80 dark:bg-neutral-800/90",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[skeleton-wave_2s_infinite] after:bg-linear-to-r after:from-transparent after:via-white/50 dark:after:via-white/10 after:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
