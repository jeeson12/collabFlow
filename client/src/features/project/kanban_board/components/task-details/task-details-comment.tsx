"use client";

import { useState } from "react";
import {
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Task, Comment } from "@/features/project/kanban_board/type";

import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../api";
import { useAuth } from "@/features/auth/authProvider";

type TaskDetailsCommentsProps = {
  task: Task;
};

export function TaskDetailsComments({ task }: TaskDetailsCommentsProps) {
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const queryClient = useQueryClient();

  const { user } = useAuth();

  // ---------------------------------------
  // Get comments
  // ---------------------------------------

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", task.id],
    queryFn: () => getComments(task.id),
  });

  const comments: Comment[] = data?.comment ?? [];

  // ---------------------------------------
  // Create comment
  // ---------------------------------------

  const createMutation = useMutation({
    mutationFn: () =>
      addComment({
        taskId: task.id,
        content: content.trim(),
      }),

    onSuccess: () => {
      setContent("");

      queryClient.invalidateQueries({
        queryKey: ["comments", task.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });
    },
  });

  // ---------------------------------------
  // Update comment
  // ---------------------------------------

  const updateMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => updateComment(commentId, content),

    onSuccess: () => {
      setEditingCommentId(null);
      setEditingContent("");

      queryClient.invalidateQueries({
        queryKey: ["comments", task.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });
    },
  });

  // ---------------------------------------
  // Delete comment
  // ---------------------------------------

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", task.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });
    },
  });

  // ---------------------------------------
  // Comment input
  // ---------------------------------------

  const handleCommentInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setContent(textarea.value);
  };

  // ---------------------------------------
  // Submit comment
  // ---------------------------------------

  const handleSubmit = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    createMutation.mutate();
  };

  // ---------------------------------------
  // Start editing
  // ---------------------------------------

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  // ---------------------------------------
  // Cancel editing
  // ---------------------------------------

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  // ---------------------------------------
  // Save edited comment
  // ---------------------------------------

  const handleSaveEdit = () => {
    if (!editingCommentId) return;

    const trimmedContent = editingContent.trim();

    if (!trimmedContent) return;

    updateMutation.mutate({
      commentId: editingCommentId,
      content: trimmedContent,
    });
  };

  return (
    <section>
      {/* Header */}

      <div className="mb-5 flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-muted-foreground" />

        <h2 className="text-sm font-semibold">Comments</h2>

        <Badge variant="secondary">{comments.length}</Badge>
      </div>

      {/* Composer */}

      <div className="overflow-hidden rounded-lg border bg-background">
        <textarea
          rows={2}
          value={content}
          placeholder="Add a comment..."
          disabled={createMutation.isPending}
          onChange={handleCommentInput}
          className="
            block
            min-h-16
            max-h-64
            w-full
            resize-none
            overflow-y-auto
            bg-transparent
            px-4
            py-3
            text-sm
            leading-6
            outline-none
            placeholder:text-muted-foreground
          "
        />

        <div className="flex justify-end border-t bg-muted/20 px-4 py-2">
          <Button
            size="sm"
            disabled={!content.trim() || createMutation.isPending}
            onClick={handleSubmit}
          >
            {createMutation.isPending ? "Commenting..." : "Comment"}
          </Button>
        </div>
      </div>

      {/* Comments */}

      <div className="mt-8 space-y-7">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Failed to load comments.</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        ) : (
          comments.map((cmt) => {
            const isOwner = user?.id === cmt.author.id;

            const isEditing = editingCommentId === cmt.id;

            return (
              <div key={cmt.id} className="group flex gap-3">
                {/* Avatar */}

                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs">
                    {cmt.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}

                <div className="min-w-0 flex-1">
                  {/* Header */}

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{cmt.author.name}</p>

                    <span className="text-xs text-muted-foreground">
                      {new Date(cmt.createdAt).toLocaleString()}
                    </span>

                    {/* 3-dot menu */}

                    {isOwner && !isEditing && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="
                              ml-auto
                              h-7
                              w-7
                              opacity-0
                              transition-opacity
                              group-hover:opacity-100
                            "
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleStartEdit(cmt)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            disabled={deleteMutation.isPending}
                            onClick={() => deleteMutation.mutate(cmt.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  {/* Editing */}

                  {isEditing ? (
                    <div className="mt-3 overflow-hidden rounded-lg border bg-background">
                      <textarea
                        value={editingContent}
                        autoFocus
                        onChange={(event) =>
                          setEditingContent(event.target.value)
                        }
                        className="
                          block
                          min-h-16
                          w-full
                          resize-none
                          bg-transparent
                          px-4
                          py-3
                          text-sm
                          leading-6
                          outline-none
                        "
                      />

                      <div className="flex justify-end gap-2 border-t bg-muted/20 px-3 py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          disabled={updateMutation.isPending}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>

                        <Button
                          size="sm"
                          disabled={
                            !editingContent.trim() || updateMutation.isPending
                          }
                          onClick={handleSaveEdit}
                        >
                          <Check className="mr-2 h-4 w-4" />

                          {updateMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                      {cmt.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
