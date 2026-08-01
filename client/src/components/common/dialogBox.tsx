"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  children: ReactNode;

  width?: "sm" | "md" | "lg" | "xl";

  headerAction?: ReactNode;
};

const widths = {
  sm: "sm:max-w-md",
  md: "sm:max-w-xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
};

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  width = "md",
  headerAction,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(widths[width], "max-h-[85vh] p-0")}>
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle>{title}</DialogTitle>

              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </div>

            {headerAction}
          </div>
        </DialogHeader>

        <div className="max-h-[calc(85vh-88px)] overflow-y-auto p-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
