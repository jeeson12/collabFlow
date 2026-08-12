"use client";

import {
  Download,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Paperclip,
  Trash2,
  File,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Attachment, Task } from "@/features/project/kanban_board/type";

import {
  deleteAttachment,
  downloadAttachment,
  getAttachments,
  uploadAttachment,
} from "../../api";

type TaskDetailsContentProps = {
  task: Task;
};

export function TaskDetailsContent({ task }: TaskDetailsContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["attachments", task.id],
    queryFn: () => getAttachments(task.id),
  });

  const attachments: Attachment[] = data?.attachment ?? [];

  const uploadMutation = useMutation({
    mutationFn: (file: File[]) => uploadAttachment(task.id, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attachments", task.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (attachmentId: string) => deleteAttachment(attachmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attachments", task.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });

      setSelectedIndex(0);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    uploadMutation.mutate(Array.from(files));

    event.target.value = "";
  };

  const handleDownload = async (attachmentId: string) => {
    try {
      const response = await downloadAttachment(attachmentId);

      if (response?.url) {
        window.open(response.url, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to download attachment:", error);
    }
  };

  const selectedAttachment = attachments[selectedIndex];

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return <ImageIcon className="h-10 w-10 text-muted-foreground" />;
    }

    if (mimeType === "application/pdf") {
      return <FileText className="h-10 w-10 text-muted-foreground" />;
    }

    return <File className="h-10 w-10 text-muted-foreground" />;
  };

  const renderPreview = (attachment: Attachment) => {
    if (!attachment.url) {
      return (
        <div className="flex h-full items-center justify-center">
          {getFileIcon(attachment.mimeType)}
        </div>
      );
    }

    if (attachment.mimeType.startsWith("image/")) {
      return (
        <button
          type="button"
          className="h-full w-full cursor-zoom-in"
          onClick={() => {
            window.open(attachment.url, "_blank", "noopener,noreferrer");
          }}
          title="Open image in new tab"
        >
          <img
            src={attachment.url}
            alt={attachment.originalFileName}
            className="h-full w-full object-contain transition-transform hover:scale-[1.02]"
          />
        </button>
      );
    }

    if (attachment.mimeType === "application/pdf") {
      return (
        <iframe
          src={attachment.url}
          title={attachment.originalFileName}
          className="h-full w-full"
        />
      );
    }

    if (attachment.mimeType.startsWith("text/")) {
      return (
        <iframe
          src={attachment.url}
          title={attachment.originalFileName}
          className="h-full w-full"
        />
      );
    }

    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        {getFileIcon(attachment.mimeType)}

        <p className="max-w-[80%] truncate text-sm font-medium">
          {attachment.originalFileName}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload(attachment.id)}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    );
  };

  return (
    <>
      {/* Description */}

      <section>
        <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
          {task.description || (
            <span className="text-sm italic text-muted-foreground">
              No description provided.
            </span>
          )}
        </p>
      </section>

      {/* Attachments */}

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-muted-foreground" />

          <h2 className="text-sm font-semibold">Attachments</h2>

          <Badge variant="secondary" className="rounded-full px-2">{attachments.length}</Badge>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-xl border bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Loading attachments...
            </p>
          </div>
        ) : attachments.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed bg-muted/20">
            <p className="text-sm text-muted-foreground">No attachments yet.</p>
          </div>
        ) : (
          <>
            {/* Large Preview */}

            <div className="relative overflow-hidden rounded-xl border bg-[#f9faf8]">
              <div className="h-105">
                {selectedAttachment && renderPreview(selectedAttachment)}
              </div>

              {attachments.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50"
                    onClick={() =>
                      setSelectedIndex((current) =>
                        current === 0 ? attachments.length - 1 : current - 1,
                      )
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50"
                    onClick={() =>
                      setSelectedIndex((current) =>
                        current === attachments.length - 1 ? 0 : current + 1,
                      )
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Attachment thumbnails */}

            <div className="flex gap-3 overflow-x-auto pb-2">
              {attachments.map((attachment, index) => (
                <div
                  key={attachment.id}
                  className={`group relative h-20 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-muted/20 transition ${
                    selectedIndex === index
                      ? "ring-2 ring-primary"
                      : "hover:border-foreground/40"
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  {attachment.mimeType.startsWith("image/") &&
                  attachment.url ? (
                    <img
                      src={attachment.url}
                      alt={attachment.originalFileName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-1 px-2">
                      {getFileIcon(attachment.mimeType)}

                      <span className="w-full truncate text-center text-[10px] text-muted-foreground">
                        {attachment.originalFileName}
                      </span>
                    </div>
                  )}

                  {/* Three dot menu */}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6 opacity-0 shadow transition-opacity group-hover:opacity-100"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleDownload(attachment.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-destructive"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(attachment.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Add attachment */}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        <Button
          variant="outline"
          size="sm"
          disabled={uploadMutation.isPending}
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="mr-2 h-4 w-4" />

          {uploadMutation.isPending ? "Uploading..." : "Add attachment"}
        </Button>
      </section>

      <Separator />
    </>
  );
}
