"use client";

import { Dispatch, SetStateAction } from "react";
import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BoardToolbarProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export function BoardToolbar({ search, setSearch }: BoardToolbarProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Assignee Filter */}
        <Button variant="outline">
          Assignee
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>

        {/* Priority Filter */}
        <Button variant="outline">
          Priority
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Group By */}
      <Button variant="ghost">
        Group By
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
