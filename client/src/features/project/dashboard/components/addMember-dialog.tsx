import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addMember, getAvailableMembers } from "../api";
import { AppDialog } from "@/components/common/dialogBox";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials, handleApiError } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type AddMemberDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
};

export function AddMemberDialog({
  open,
  onOpenChange,
  projectId,
}: AddMemberDialogProps) {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["available-members", projectId],
    queryFn: () => getAvailableMembers(projectId),
    enabled: open,
  });

  const addMemberMutation = useMutation({
    mutationFn: (userId: string) => addMember(projectId, userId, "MEMBER"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-members", projectId],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Members"
      description="Invite workspace members to this project."
      width="md"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-100 pr-3">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Loading members...
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No available members found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(member.name ?? "")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{member.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    disabled={addMemberMutation.isPending}
                    onClick={() => addMemberMutation.mutate(member.id)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </AppDialog>
  );
}
