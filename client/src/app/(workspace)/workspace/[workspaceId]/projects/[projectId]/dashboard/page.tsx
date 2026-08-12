"use client";

import { ProjectHeader } from "@/features/project/dashboard/components/projectHeader";
import { TaskOverview } from "@/features/project/dashboard/components/task-card";
import { MembersCard } from "@/features/project/dashboard/components/members-card";
import { RecentActivity } from "@/features/project/dashboard/components/activity-card";
import { AnalyticsCard } from "@/features/project/dashboard/components/analytics";
import { FilesCard } from "@/features/project/dashboard/components/files-card";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getActivity,
  getMembers,
  getProject,
  getRecentFiles,
  getTaskStats,
} from "@/features/project/dashboard/api";
import { useState } from "react";
import { ProjectMembersDialog } from "@/features/project/dashboard/components/member-dialog";
import { AddMemberDialog } from "@/features/project/dashboard/components/addMember-dialog";
import { ActivityDialog } from "@/features/project/dashboard/components/activity-dialog";
import { downloadFiles, openFiles } from "@/lib/utils";
import { FilesDialog } from "@/features/project/dashboard/components/file-dialog";
import { CreateTaskDialog } from "@/features/project/kanban_board/components/create-task-dialog";

export default function DashboardPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [addMembersDialogOpen, setAddMembersDialogOpen] = useState(false);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [filesDialogOpen, setFilesDialogOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  const { data: membersData } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => getMembers(projectId),
  });

  const { data: taskData } = useQuery({
    queryKey: ["task-details", projectId],
    queryFn: () => getTaskStats(projectId),
  });

  const { data: Activity = [] } = useQuery({
    queryKey: ["activities", projectId],
    queryFn: () => getActivity(projectId),
    enabled: !!projectId,
  });

  const { data: files = [] } = useQuery({
    queryKey: ["files", projectId],
    queryFn: () => getRecentFiles(projectId),
    enabled: !!projectId,
  });

  const totalTasks = taskData?.total ?? 0;
  const overdueTasks = taskData?.overdue ?? 0;
  const columns = taskData?.columns ?? [];

  const completionColumn = columns.find((column) => column.isCompletionColumn);

  const completedTasks = completionColumn?.total ?? 0;

  const remainingTasks = Math.max(totalTasks - completedTasks, 0);

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (isLoading || !project) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-6 pt-6 pb-4">
      {/* Project Header */}

      <ProjectHeader
        project={project}
        members={membersData?.members ?? []}
        memberCount={membersData?.count ?? 0}
        onCreateTask={() => setCreateTaskOpen(true)}
        onInviteMember={() => setInviteMemberOpen(true)}
      />
      {/* ========================= */}
      {/* Main Content – masonry layout, no gaps */}
      {/* ========================= */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3 gap-x-4">
        <div className="mb-6 break-inside-avoid">
          <TaskOverview
            totalTasks={totalTasks}
            overdueTasks={overdueTasks}
            columns={columns}
          />
        </div>

        <div className="mb-6 break-inside-avoid">
          <MembersCard
            members={membersData?.members ?? []}
            onOpenMembers={() => setMembersDialogOpen(true)}
            onOpenAddMembers={() => setAddMembersDialogOpen(true)}
          />
        </div>

        <div className="mb-6 break-inside-avoid">
          <RecentActivity
            activities={Activity}
            onViewAll={() => setActivityDialogOpen(true)}
          />
        </div>

        <div className="mb-6 break-inside-avoid">
          <AnalyticsCard
            completionRate={completionRate}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            remainingTasks={remainingTasks}
          />
        </div>

        <div className="mb-6 break-inside-avoid">
          <FilesCard
            onViewAll={() => setFilesDialogOpen(true)}
            files={files}
            onOpenFile={openFiles}
            onDownloadFile={downloadFiles}
          />
        </div>
      </div>
      {/* ========================= */}
      {/* Dialogs */}
      {/* ========================= */}
      <ProjectMembersDialog
        open={membersDialogOpen}
        onOpenChange={setMembersDialogOpen}
        members={membersData?.members ?? []}
        projectId={projectId}
      />
      <AddMemberDialog
        open={addMembersDialogOpen}
        onOpenChange={setAddMembersDialogOpen}
        projectId={projectId}
      />

      <ActivityDialog
        open={activityDialogOpen}
        onOpenChange={setActivityDialogOpen}
        activities={Activity}
      />
      <FilesDialog
        open={filesDialogOpen}
        onOpenChange={setFilesDialogOpen}
        files={files}
        onOpenFile={openFiles}
        onDownloadFile={downloadFiles}
      />
      <CreateTaskDialog
        projectId={project.id}
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
      />

      <AddMemberDialog
        projectId={project.id}
        open={inviteMemberOpen}
        onOpenChange={setInviteMemberOpen}
      />
    </div>
  );
}
