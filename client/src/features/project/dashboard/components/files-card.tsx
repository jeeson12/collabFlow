"use client";

import { Download, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Attachment } from "../type";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FilesCardProps = {
  files: Attachment[];
  onViewAll: () => void;
  onOpenFile: (attachmentId: string) => void;
  onDownloadFile: (attachmentId: string, fileName: string) => void;
};

export function FilesCard({
  files,
  onViewAll,
  onOpenFile,
  onDownloadFile,
}: FilesCardProps) {
  const visibleFiles = files.slice(0, 5);

  return (
    <Card className="shadow-none rounded-xl border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <FileText className="h-5 w-5" />
          Files
        </CardTitle>
      </CardHeader>

      <CardContent>
        {visibleFiles.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No files uploaded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {visibleFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onOpenFile(file.id)}
                className="flex cursor-pointer items-center justify-between px-3 py-1 transition-colors hover:bg-muted/50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-5 w-5 shrink-0 text-blue-500" />

                  <div className="min-w-0 max-w-30">
                    <p className="truncate text-sm font-medium">
                      {file.originalFileName}
                    </p>

                    <p className="text-xs text-muted-foreground">
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

        {files.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <Button variant="outline" className="w-full bg-white border-border text-foreground hover:bg-slate-50" onClick={onViewAll}>
              View Files
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
