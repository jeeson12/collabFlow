"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { DueDateFilter, PriorityFilter } from "../type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BoardToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  priority: PriorityFilter;
  onPriorityChange: (value: PriorityFilter) => void;

  dueDateFilter: DueDateFilter;
  onDueDateFilterChange: (value: DueDateFilter) => void;
};

export function BoardToolbar({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  dueDateFilter,
  onDueDateFilterChange,
}: BoardToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search by ticket, title, description or assignee..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-3">
        <Select
          value={priority}
          onValueChange={(value) => onPriorityChange(value as PriorityFilter)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">ALL Priorities</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={dueDateFilter}
          onValueChange={(value) =>
            onDueDateFilterChange(value as DueDateFilter)
          }
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Due Dates</SelectItem>
            <SelectItem value="TODAY">Today</SelectItem>
            <SelectItem value="THIS_WEEK">This Week</SelectItem>
            <SelectItem value="OVERDUE">Overdue</SelectItem>
            <SelectItem value="NO_DUE_DATE">No Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
