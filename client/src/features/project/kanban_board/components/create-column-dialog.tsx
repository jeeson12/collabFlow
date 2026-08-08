"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Column } from "@/features/project/kanban_board/type";

type ColumnDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode: "create" | "edit";

  column?: Column | null;

  onSubmit: (name: string) => void;

  isLoading?: boolean;
};

export function ColumnDialog({
  open,
  onOpenChange,
  mode,
  column,
  onSubmit,
  isLoading = false,
}: ColumnDialogProps) {
  const [name, setName] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    if (open) {
      setName(isEdit ? (column?.name ?? "") : "");
    }
  }, [open, isEdit, column]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmit(trimmedName);
  };

  const handleOpenChange = (value: boolean) => {
    if (isLoading) {
      return;
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit column" : "Create column"}
            </DialogTitle>

            <DialogDescription>
              {isEdit
                ? "Update the name of this column."
                : "Add a new column to your board."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="space-y-2">
              <label htmlFor="column-name" className="text-sm font-medium">
                Column name
              </label>

              <Input
                id="column-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. In Review"
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={!name.trim() || isLoading}>
              {isLoading
                ? "Saving..."
                : isEdit
                  ? "Save changes"
                  : "Create column"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
