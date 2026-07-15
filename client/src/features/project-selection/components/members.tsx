import { ArrowRight, Crown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ActiveMembersCard() {
  return (
    <section className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Workspace Members</h2>
          <p className="text-sm text-muted-foreground">
            People currently collaborating in this workspace.
          </p>
        </div>

        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Member */}
        <div className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>JJ</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">Jeeson Jacob</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>

          <Badge>
            <Crown className="mr-1 h-3 w-3" />
            Admin
          </Badge>
        </div>

        {/* Member */}
        <div className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">Alex Roy</p>
              <p className="text-sm text-muted-foreground">
                Last active 3m ago
              </p>
            </div>
          </div>

          <Badge variant="secondary">Member</Badge>
        </div>

        {/* Member */}
        <div className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">Sarah Mathew</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>

          <Badge variant="secondary">Member</Badge>
        </div>

        {/* Member */}
        <div className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">David Kurian</p>
              <p className="text-sm text-muted-foreground">
                Last active 10m ago
              </p>
            </div>
          </div>

          <Badge variant="secondary">Member</Badge>
        </div>
      </div>
    </section>
  );
}
