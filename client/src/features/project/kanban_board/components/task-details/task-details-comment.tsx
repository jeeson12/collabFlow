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
import { CommentsListSkeleton } from "@/components/common/skeletons";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

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
import { getMembers } from "@/features/project/dashboard/api";
import { ProjectMember } from "@/features/project/dashboard/type";

type TaskDetailsCommentsProps = {
  task: Task;
};

export function TaskDetailsComments({ task }: TaskDetailsCommentsProps) {
  const [content, setContent] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [editingContent, setEditingContent] = useState("");

  // ---------------------------------------
  // Mention state
  // ---------------------------------------

  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const [mentionedUserIds, setMentionedUserIds] = useState<string[]>([]);
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
  // Get project members
  // ---------------------------------------

  const { data: membersData } = useQuery({
    queryKey: ["project-members", task.projectId],
    queryFn: () => getMembers(task.projectId),
  });

  const projectMembers = membersData?.members ?? [];

  // ---------------------------------------
  // Filter members for mention
  // ---------------------------------------

  const filteredMembers = projectMembers.filter((member) => {
    if (!member.user?.name) return false;

    return member.user.name
      .toLowerCase()
      .includes(mentionQuery.toLowerCase().trim());
  });

  // ---------------------------------------
  // Create comment
  // ---------------------------------------

  const createMutation = useMutation({
    mutationFn: () => {
      const validMentionedUserIds = mentionedUserIds.filter((userId) => {
        const member = projectMembers.find(
          (member) => member.user.id === userId,
        );

        if (!member?.user.name) return false;

        return content.includes(`@${member.user.name}`);
      });

      return addComment({
        taskId: task.id,
        content: content.trim(),
        mentionedUserIds: validMentionedUserIds,
      });
    },

    onSuccess: () => {
      toast.success("Comment added successfully");
      setContent("");
      setMentionedUserIds([]);

      setMentionQuery("");
      setMentionStart(null);
      setShowMentionSuggestions(false);

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
      toast.success("Comment updated successfully");
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
      toast.success("Comment deleted successfully");
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
    const value = textarea.value;
    const cursorPosition = textarea.selectionStart;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setContent(value);

    const textBeforeCursor = value.slice(0, cursorPosition);

    const match = textBeforeCursor.match(/@([a-zA-Z0-9._-]*)$/);

    if (match) {
      const query = match[1];

      // Only show suggestions after typing
      // at least one character after @
      if (query.length === 0) {
        setMentionQuery("");
        setMentionStart(null);
        setShowMentionSuggestions(false);
        return;
      }

      setMentionQuery(query);
      setMentionStart(cursorPosition - query.length - 1);
      setShowMentionSuggestions(true);
    } else {
      setMentionQuery("");
      setMentionStart(null);
      setShowMentionSuggestions(false);
    }
  };

  // ---------------------------------------
  // Select mention
  // ---------------------------------------

  const handleMentionSelect = (member: ProjectMember) => {
    if (mentionStart === null) return;

    const textarea = document.querySelector(
      "#comment-input",
    ) as HTMLTextAreaElement | null;

    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;

    const beforeMention = content.slice(0, mentionStart);

    const afterMention = content.slice(cursorPosition);

    const memberName = member.user?.name;

    if (!memberName) return;

    const mentionText = `@${memberName} `;

    const newContent = beforeMention + mentionText + afterMention;

    setContent(newContent);

    setMentionQuery("");
    setMentionStart(null);
    setShowMentionSuggestions(false);
    setMentionedUserIds((prev) => {
      if (prev.includes(member.user.id)) {
        return prev;
      }

      return [...prev, member.user.id];
    });

    requestAnimationFrame(() => {
      textarea.focus();

      const newCursorPosition = beforeMention.length + mentionText.length;

      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    setMentionedUserIds((prev) => {
      if (prev.includes(member.user.id)) {
        return prev;
      }

      return [...prev, member.user.id];
    });
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

      <div className="overflow-visible rounded-lg border bg-background">
        <div className="relative">
          <textarea
            id="comment-input"
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

          {/* Mention suggestions */}

          {showMentionSuggestions && filteredMembers.length > 0 && (
            <div
              className="
                  absolute
                  bottom-full
                  left-0
                  z-50
                  mb-2
                  w-72
                  overflow-hidden
                  rounded-lg
                  border
                  bg-popover
                  p-1
                  shadow-lg
                "
            >
              {filteredMembers.map((member) => {
                const memberName = member.user?.name;

                if (!memberName) {
                  return null;
                }

                return (
                  <button
                    key={member.user.id}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();

                      handleMentionSelect(member);
                    }}
                    className="
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-md
                          px-3
                          py-2
                          text-left
                          transition-colors
                          hover:bg-accent
                        "
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_API_URL}/auth/avatar/${member.user.id}`}
                        alt=""
                      />
                      <AvatarFallback className="text-xs">
                        {memberName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {memberName}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {member.user.email}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

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
          <CommentsListSkeleton />
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

                <Avatar className="h-7 w-7 shrink-0">
                  {cmt.author.avatarPath && (
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_URL}/auth/avatar/${cmt.author.id}`}
                      alt=""
                    />
                  )}
                  <AvatarFallback className="text-xs">
                    {cmt.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}

                <div className="min-w-0 flex-1 ">
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
                      {cmt.content
                        .split(/(@[a-zA-Z0-9._-]+)/g)
                        .map((part, index) => {
                          if (part.startsWith("@")) {
                            return (
                              <strong
                                key={index}
                                className="font-semibold text-foreground"
                              >
                                {part}
                              </strong>
                            );
                          }

                          return <span key={index}>{part}</span>;
                        })}
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
