"use client";

import { ProjectHeader } from "@/features/dashboard/components/projectHeader";
import { TaskOverview } from "@/features/dashboard/components/task-card";
import { MembersCard } from "@/features/dashboard/components/members-card";
import { RecentActivity } from "@/features/dashboard/components/activity-card";
import { AnalyticsCard } from "@/features/dashboard/components/analytics";
import { FilesCard } from "@/features/dashboard/components/files-card";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 pt-6 pb-4">
      {/* Project Header */}
      <ProjectHeader />

      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}
      <div className="space-y-6">
        {/* Top Section */}
        <section className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Task Overview Widget */}
          <TaskOverview
            totalTasks={42}
            completedTasks={10}
            todoTasks={12}
            inProgressTasks={18}
            overdueTasks={2}
          />

          {/* Project Members */}
          <MembersCard
            members={[
              {
                id: "1",
                name: "Jeeson Jacob",
                role: "Owner",
              },
              {
                id: "2",
                name: "Alice Rose",
                role: "Developer",
              },
              {
                id: "3",
                name: "Mike Kent",
                role: "Designer",
              },
              {
                id: "4",
                name: "Dave Brown",
                role: "Developer",
              },
            ]}
          />

          {/* Recent Activity */}
          <RecentActivity
            activities={[
              {
                id: "1",
                title: "John created Authentication task",
                time: "5 minutes ago",
                type: "activity",
              },
              {
                id: "2",
                title: "Mike completed Dashboard UI",
                time: "1 hour ago",
                type: "success",
              },
              {
                id: "3",
                title: "Payment API is overdue",
                time: "Today",
                type: "warning",
              },
              {
                id: "4",
                title: "Sarah commented on Dashboard UI",
                time: "3 hours ago",
                type: "activity",
              },
              {
                id: "5",
                title: "Workspace setup completed",
                time: "Yesterday",
                type: "success",
              },
            ]}
          />
        </section>

        {/* Bottom Section */}
        <section className="grid gap-6 lg:grid-cols-2 items-start">
          {/* Analytics */}
          <AnalyticsCard
            completionRate={72}
            totalTasks={42}
            completedTasks={30}
            remainingTasks={12}
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
    </div>
  );
}
