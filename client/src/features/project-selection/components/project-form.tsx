import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import z from "zod";
import { createProject, updateProject } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleApiError } from "@/lib/utils";
import { Project } from "../type";
import { useEffect } from "react";

type CreateProjectFormProps = {
  mode: "create" | "edit";
  project?: Project;
  workspaceId: string;
  onSuccess: () => void;
};
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  projectKey: z
    .string()
    .min(2)
    .max(6)
    .regex(/^[A-Z0-9]+$/),
});

type FormValues = z.infer<typeof formSchema>;
export function ProjectForm({
  mode,
  project,
  workspaceId,
  onSuccess,
}: CreateProjectFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectKey: "",
      description: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && project) {
      form.reset({
        name: project.name,
        projectKey: project.projectKey || "",
        description: project.description || "",
      });
    }
  }, [mode, project, form]);

  const router = useRouter();

  const projectMutation = useMutation({
    mutationFn: (values: FormValues) => {
      if (mode === "create") {
        return createProject({ workspaceId, ...values });
      }
      if (!project) throw new Error("Project not found");
      return updateProject(project?.id, values);
    },

    onSuccess: (data) => {
      toast.success(mode === "create" ? "Project created" : "Project updated");
      queryClient.invalidateQueries({ queryKey: ["projects", workspaceId] });

      if (mode === "edit" && project?.id) {
        queryClient.invalidateQueries({ queryKey: ["project", project.id] });
      }

      form.reset();
      onSuccess();

      // Redirect immediately to the newly created project
      if (mode === "create" && data?.id) {
        router.push(`/workspace/${workspaceId}/projects/${data.id}/dashboard`);
      }
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const submit = (values: FormValues) => {
    projectMutation.mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Project Name</label>

        <Input placeholder="Enter project name" {...form.register("name")} />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Project Key</label>

        <Input
          placeholder="CP"
          className="uppercase"
          {...form.register("projectKey")}
          onChange={(e) =>
            form.setValue("projectKey", e.target.value.toUpperCase(), {
              shouldValidate: true,
            })
          }
        />

        {form.formState.errors.projectKey && (
          <p className="text-sm text-red-500">
            {form.formState.errors.projectKey.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>

        <Textarea
          placeholder="Enter project description (optional)"
          rows={4}
          {...form.register("description")}
        />

        {form.formState.errors.description && (
          <p className="text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <Button className="w-full" disabled={projectMutation.isPending}>
        {projectMutation.isPending
          ? mode === "create"
            ? "Creating..."
            : "Saving..."
          : mode === "create"
            ? "Create Project"
            : "Save Changes"}
      </Button>
    </form>
  );
}
