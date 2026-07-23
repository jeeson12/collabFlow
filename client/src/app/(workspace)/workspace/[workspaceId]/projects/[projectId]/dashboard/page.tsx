"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  FolderKanban,
  Plus,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
      {/* ========================= */}
      {/* Project Header */}
      {/* ========================= */}
      <section className="flex flex-col gap-6 rounded-2xl border bg-card p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-5">
          <Badge className="w-fit">CF-101</Badge>

          <div>
            <h1 className="text-4xl font-bold">CollabFlow</h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Modern collaboration platform for managing projects, teams, boards
              and tasks from one beautiful workspace.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>JJ</AvatarFallback>
            </Avatar>

            <Avatar>
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>

            <Avatar>
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>

            <Avatar>
              <AvatarFallback>DB</AvatarFallback>
            </Avatar>

            <span className="ml-2 text-sm text-muted-foreground">
              +5 Members
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>

          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </section>

      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}
      <div className="space-y-6">
        {/* Top Section */}
        <section className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Task Overview Widget */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">10</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Todo</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      Overdue Tasks
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      2
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Members */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle>Members</CardTitle>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <UserPlus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Jeeson", role: "Owner", initial: "JJ" },
                  { name: "Alice", role: "Developer", initial: "AR" },
                  { name: "Mike", role: "Designer", initial: "MK" },
                  { name: "Dave", role: "Developer", initial: "DB" },
                ].map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{member.initial}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3">
                <Activity className="mt-1 h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">
                    John created Authentication task
                  </p>
                  <span className="text-xs text-muted-foreground">
                    5 minutes ago
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-sm">
                    Mike completed Dashboard UI
                  </p>
                  <span className="text-xs text-muted-foreground">
                    1 hour ago
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <AlertTriangle className="mt-1 h-4 w-4 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Payment API is overdue</p>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Activity className="mt-1 h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">
                    Sarah commented on Dashboard UI
                  </p>
                  <span className="text-xs text-muted-foreground">
                    3 hours ago
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-sm">
                    Workspace setup completed
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Yesterday
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom Section */}
        <section className="grid gap-6 lg:grid-cols-2 items-start">
          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <h2 className="mt-1 text-3xl font-bold">72%</h2>
              </div>
              <Progress value={72} />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>42 Total Tasks</p>
                <p>30 Completed</p>
                <p>12 Remaining</p>
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Files
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">design.fig</p>
                <p className="text-xs text-muted-foreground">Updated today</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">api-docs.pdf</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <Button variant="outline" className="w-full">
                View Files
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
