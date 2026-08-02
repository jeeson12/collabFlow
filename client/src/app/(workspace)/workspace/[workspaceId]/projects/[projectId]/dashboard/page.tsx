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
  getTaskStats,
} from "@/features/project/dashboard/api";
import { useState } from "react";
import { ProjectMembersDialog } from "@/features/project/dashboard/components/member-dialog";
import { AddMemberDialog } from "@/features/project/dashboard/components/addMember-dialog";
import { ActivityDialog } from "@/features/project/dashboard/components/activity-dialog";

export default function DashboardPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [addMembersDialogOpen, setAddMembersDialogOpen] = useState(false);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);

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

  if (isLoading || !project) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 pt-6 pb-4">
      {/* Project Header */}

      <ProjectHeader
        project={project}
        members={membersData?.members ?? []}
        memberCount={membersData?.count ?? 0}
      />
      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}
      <div className="space-y-6">
        {/* Top Section */}
        <section className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Task Overview Widget */}
          <TaskOverview
            totalTasks={taskData?.total ?? 0}
            completedTasks={taskData?.completed ?? 0}
            todoTasks={taskData?.todo ?? 0}
            inProgressTasks={taskData?.inprogress ?? 0}
            overdueTasks={taskData?.overdue ?? 0}
          />

          {/* Project Members */}
          <MembersCard
            members={membersData?.members ?? []}
            onOpenMembers={() => setMembersDialogOpen(true)}
            onOpenAddMembers={() => setAddMembersDialogOpen(true)}
          />

          {/* Recent Activity */}
          <RecentActivity
            activities={Activity}
            onViewAll={() => setActivityDialogOpen(true)}
          />
        </section>

        {/* Bottom Section */}
        <section className="grid gap-6 lg:grid-cols-2 items-start">
          {/* Analytics */}
          <AnalyticsCard
            completionRate={taskData?.completionRate ?? 0}
            totalTasks={taskData?.total ?? 0}
            completedTasks={taskData?.completed ?? 0}
            remainingTasks={taskData?.remaining ?? 0}
          />
          {/* Files */}
          <FilesCard
            files={[
              {
                id: "1",
                name: "design.fig",
                updatedAt: "Updated today",
              },
              {
                id: "2",
                name: "api-docs.pdf",
                updatedAt: "Yesterday",
              },
            ]}
          />
        </section>
      </div>
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
    </div>
  );
}
