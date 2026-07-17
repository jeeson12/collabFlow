"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { createWorkspace } from "../api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(3, "Workspace name must be at least 3 characters"),
});

type formValues = z.infer<typeof schema>;

type props = { onSuccess: () => void };

export function CreateWorkspaceForm({ onSuccess }: props) {
  const form = useForm<formValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      (form.reset(), onSuccess());
    },
  });

  const submit = (values: formValues) => {
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
        {mutation.isPending ? "Creating..." : "Create Workspace"}
      </Button>
    </form>
  );
}
