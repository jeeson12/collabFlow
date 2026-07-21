"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createWorkspace, updateWorkspace } from "../api";
import { Workspace } from "../type";

const schema = z.object({
  name: z.string().min(3, "Workspace name must be at least 3 characters"),
});

type FormValues = z.infer<typeof schema>;

type WorkspaceFormProps = {
  mode: "create" | "edit";
  workspace?: Workspace;
  onSuccess: () => void;
};

export function WorkspaceForm({
  mode,
  workspace,
  onSuccess,
}: WorkspaceFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && workspace) {
      form.reset({
        name: workspace.name,
      });
    } else {
      form.reset({
        name: "",
      });
    }
  }, [mode, workspace, form]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      if (mode === "create") {
        return createWorkspace(values);
      }

      if (!workspace) {
        throw new Error("Workspace is required in edit mode");
      }

      return updateWorkspace(workspace.id, values);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      toast.success(
        mode === "create"
          ? "Workspace created successfully"
          : "Workspace updated successfully",
      );

      form.reset();
      onSuccess();
    },

    onError: () => {
      toast.error(
        mode === "create"
          ? "Failed to create workspace"
          : "Failed to update workspace",
      );
    },
  });

  const submit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Workspace Name</label>

        <Input placeholder="Enter workspace name" {...form.register("name")} />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <Button className="w-full" disabled={mutation.isPending}>
        {mutation.isPending
          ? mode === "create"
            ? "Creating..."
            : "Saving..."
          : mode === "create"
            ? "Create Workspace"
            : "Save Changes"}
      </Button>
    </form>
  );
}
