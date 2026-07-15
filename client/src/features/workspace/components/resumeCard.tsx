import { ArrowRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeCard() {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">
              Continue where you left off
            </h2>

            <p className="text-sm text-muted-foreground">
              Resume your latest workspace.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock3 className="size-4 text-muted-foreground" />

            <span className="font-medium">Personal Workspace</span>

            <span className="text-muted-foreground">
              • Last opened 2 hours ago
            </span>
          </div>
        </div>

        <Button>
          Continue
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  );
}
