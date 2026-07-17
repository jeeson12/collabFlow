import ProjectSelectionPage from "@/features/project-selection/projectPage";

type Props = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { workspaceId } = await params;

  return (
    <ProjectSelectionPage workspaceId={workspaceId} />
  );
}