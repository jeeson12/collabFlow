"use client";

import { Download, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Attachment } from "../type";
import { AppDialog } from "@/components/common/dialogBox";
import { Button } from "@/components/ui/button";

type FilesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  files: Attachment[];

  onOpenFile: (attachmentId: string) => void;
  onDownloadFile: (attachmentId: string, fileName: string) => void;
};

export function FilesDialog({
  open,
  onOpenChange,
  files,
  onOpenFile,
  onDownloadFile,
}: FilesDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Project Files"
      description={`${files.length} file${files.length !== 1 ? "s" : ""}`}
      width="lg"
    >
      {files.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          No files uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => onOpenFile(file.id)}
              className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-5 w-5 shrink-0 text-blue-500" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {file.originalFileName}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Uploaded by {file.uploader.name} •{" "}
                    {formatDistanceToNow(new Date(file.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadFile(file.id, file.originalFileName);
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </AppDialog>
  );
}
