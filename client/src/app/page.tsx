import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Paperclip,
  Users,
} from "lucide-react";

const tasks = [
  {
    title: "Implement WebSocket gateway",
    assignee: "JV",
    priority: "High",
    due: "Today",
    comments: 4,
    attachments: 2,
  },
  {
    title: "Configure Prisma ORM",
    assignee: "AM",
    priority: "Medium",
    due: "Tomorrow",
    comments: 2,
    attachments: 1,
  },
  {
    title: "Add offline caching",
    assignee: "RK",
    priority: "Low",
    due: "Aug 14",
    comments: 1,
    attachments: 0,
  },
];

const features = [
  {
    number: "01",
    title: "Workspaces",
    description:
      "Keep teams, projects, members, and shared context organized in one place.",
  },
  {
    number: "02",
    title: "Projects",
    description:
      "Give every project a clear home with progress, members, files, and activity.",
  },
  {
    number: "03",
    title: "Kanban boards",
    description:
      "Move work through a simple visual workflow with clear ownership and priorities.",
  },
  {
    number: "04",
    title: "Task management",
    description:
      "Track assignments, due dates, priorities, comments, and attachments together.",
  },
  {
    number: "05",
    title: "Comments & mentions",
    description:
      "Discuss the work directly where it happens and keep decisions connected to tasks.",
  },
  {
    number: "06",
    title: "Files & attachments",
    description:
      "Keep important project and task files close to the work they belong to.",
  },
  {
    number: "07",
    title: "Activity history",
    description:
      "Understand what changed, who changed it, and when it happened.",
  },
  {
    number: "08",
    title: "Notifications",
    description:
      "Stay aware of assignments, mentions, updates, and other activity that needs attention.",
  },
  {
    number: "09",
    title: "Team management",
    description:
      "Manage workspace and project members without losing track of who has access.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#063325]">
      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-[#CBCBCB] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.035em] text-[#063325]"
          >
            CollabFlow
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#product"
              className="text-sm text-[#063325] transition-opacity hover:opacity-60"
            >
              Product
            </a>

            <a
              href="#features"
              className="text-sm text-[#063325] transition-opacity hover:opacity-60"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-sm text-[#063325] transition-opacity hover:opacity-60"
            >
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#063325] transition-opacity hover:opacity-60 block"
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#063325] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-[#063325] bg-[#063325]">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pb-15 lg:pt-12">
          <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="max-w-xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Team collaboration
              </p>

              <h1 className="mt-5 text-4xl font-bold font-serif tracking-tight leading-[1.08] sm:text-5xl text-white">
                Everything your team needs to move projects forward.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
                CollabFlow brings projects, tasks, conversations, files, and
                team activity together in one focused workspace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-[#063325] transition-opacity hover:opacity-90"
                >
                  Get started
                  <ArrowRight className="size-4" />
                </Link>

                <a
                  href="#product"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  See how it works
                </a>
              </div>
            </div>

            <HeroProductPreview />
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCT INTRO
      ========================================================= */}

      <section id="product" className="scroll-mt-16 bg-[#F2F2F2]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-20">
            <div className="max-w-xl">
              <SectionLabel>One workspace</SectionLabel>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Keep the work together.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#063325]/75">
                Projects become difficult to manage when tasks, conversations,
                files, updates, and people are scattered across different tools.
              </p>

              <p className="mt-4 text-base leading-7 text-[#063325]/75">
                CollabFlow gives that work one focused place, so the context
                stays close to the project.
              </p>
            </div>

            <ProjectOverview />
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT MANAGEMENT
      ========================================================= */}

      <section className="border-b border-[#CBCBCB] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-20">
            <div className="max-w-lg">
              <SectionLabel>Project management</SectionLabel>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Know where a project stands.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#063325]/75">
                Keep progress, tasks, team members, files, and recent activity
                visible without building a report just to answer a simple
                question.
              </p>
            </div>

            <ProjectDashboard />
          </div>
        </div>
      </section>

      {/* =========================================================
          KANBAN
      ========================================================= */}

      <section className="bg-[#063325] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-20">
            <KanbanBoard />

            <div className="max-w-lg lg:order-last">
              <SectionLabel dark>Kanban workflow</SectionLabel>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                See the work. Move it forward.
              </h2>

              <p className="mt-5 text-base leading-7 text-white/75">
                Organize work through clear stages and keep every task tied to
                the people, dates, priorities, comments, and files that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM COLLABORATION
      ========================================================= */}

      <section className="border-y border-[#CBCBCB] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <SectionLabel>Team collaboration</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Conversations stay connected to the work.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#063325]/75">
              Discuss tasks, mention teammates, share files, and keep a clear
              history of what happened.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CommentsPanel />
            <ActivityPanel />
          </div>
        </div>
      </section>

      {/* =========================================================
          FILES
      ========================================================= */}

      <section className="bg-[#F2F2F2]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
            <div className="max-w-lg">
              <SectionLabel>Files & attachments</SectionLabel>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Keep the files where the work happens.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#063325]/75">
                Attach designs, documents, and other project files directly to
                the work they belong to. No archaeology expedition required.
              </p>
            </div>

            <FilesPanel />
          </div>
        </div>
      </section>

      {/* =========================================================
          ACTIVITY / NOTIFICATIONS
      ========================================================= */}

      <section className="border-b border-[#CBCBCB] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
            <NotificationPanel />

            <div className="max-w-lg">
              <SectionLabel>Activity & notifications</SectionLabel>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Know what changed without chasing updates.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#063325]/75">
                Stay aware of assignments, mentions, task updates, new files,
                and project activity that actually matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WORKFLOW
      ========================================================= */}

      <section id="workflow" className="scroll-mt-16 bg-[#063325] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <SectionLabel dark>How it works</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl text-white">
              A simple path from planning to done.
            </h2>
          </div>

          <div className="mt-16">
            {[
              [
                "01",
                "Create a workspace",
                "Bring your team and projects together.",
              ],
              [
                "02",
                "Organize the work",
                "Create projects, tasks, and Kanban workflows.",
              ],
              [
                "03",
                "Collaborate",
                "Discuss work, share files, and keep everyone updated.",
              ],
              [
                "04",
                "Move projects forward",
                "Track progress without jumping between tools.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-4 border-t border-[#CBCBCB]/30 py-7 md:grid-cols-[90px_1fr_1fr] md:items-center"
              >
                <span className="text-sm font-semibold text-white/45">
                  {number}
                </span>

                <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">
                  {title}
                </h3>

                <p className="max-w-md text-sm leading-6 text-white/70">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section
        id="features"
        className="scroll-mt-16 border-y border-[#CBCBCB] bg-[#F2F2F2]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="max-w-lg">
              <SectionLabel>Capabilities</SectionLabel>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Everything your team needs, without the clutter.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#063325]/75">
                The important parts of project collaboration live together,
                instead of being scattered across separate tools.
              </p>
            </div>

            <div>
              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="grid gap-3 border-t border-[#CBCBCB] py-6 sm:grid-cols-[60px_0.8fr_1.2fr] sm:items-start sm:gap-6"
                >
                  <span className="text-xs font-semibold text-[#063325]/45">
                    {feature.number}
                  </span>

                  <h3 className="text-sm font-semibold">{feature.title}</h3>

                  <p className="text-sm leading-6 text-[#063325]/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section id="pricing" className="scroll-mt-16 bg-[#063325] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 lg:px-10 lg:py-28">
          <SectionLabel dark>Get started</SectionLabel>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Bring your team&apos;s work into one place.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70">
            Organize projects, coordinate tasks, and keep your team aligned with
            CollabFlow.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#063325] transition-opacity hover:opacity-90"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <Link
                href="/"
                className="text-lg font-semibold tracking-[-0.035em]"
              >
                CollabFlow
              </Link>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#063325]/60">
                Project collaboration, task management, and team activity in one
                focused workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#063325]">
              <Link href="/about" className="hover:opacity-60">
                About
              </Link>

              <Link href="/terms" className="hover:opacity-60">
                Terms of Service
              </Link>

              <Link href="/privacy" className="hover:opacity-60">
                Privacy Policy
              </Link>

              <a href="#" className="hover:opacity-60">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-[#CBCBCB] pt-6 text-xs text-[#063325]/50">
            © {new Date().getFullYear()} CollabFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-white/60" : "text-[#063325]"
      }`}
    >
      {children}
    </p>
  );
}

/* =========================================================
   HERO PRODUCT PREVIEW
========================================================= */

function HeroProductPreview() {
  return (
    <div className="w-full border border-[#CBCBCB] bg-[#F2F2F2]">
      <div className="grid min-h-107.5 md:grid-cols-[190px_1fr]">
        {/* Product sidebar */}
        <aside className="hidden border-r border-[#CBCBCB] bg-white p-4 md:block">
          <div className="text-sm font-semibold">CollabFlow</div>

          <div className="mt-8 space-y-1">
            <PreviewNav icon={<LayoutDashboard />} label="Overview" active />

            <PreviewNav icon={<FolderKanban />} label="Board" />

            <PreviewNav icon={<Check />} label="Tasks" />

            <PreviewNav icon={<FileText />} label="Files" />

            <PreviewNav icon={<Activity />} label="Activity" />
          </div>

          <div className="mt-10 border-t border-[#CBCBCB] pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#063325]/50">
              Workspace
            </p>

            <p className="mt-2 text-xs font-medium">Acme Studio</p>
          </div>
        </aside>

        {/* Product content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#CBCBCB] pb-5">
            <div>
              <p className="text-xs text-[#063325]/55">Project</p>

              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                Backend architecture
              </h3>
            </div>

            <div className="flex -space-x-2">
              {["JV", "AM", "RK", "NS"].map((initials) => (
                <div
                  key={initials}
                  className="flex size-8 items-center justify-center rounded-full border-2 border-[#F2F2F2] bg-white text-[9px] font-semibold text-[#063325]"
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 py-5 sm:grid-cols-3">
            <PreviewStat label="Tasks" value="24" />
            <PreviewStat label="Completed" value="16" />
            <PreviewStat label="Overdue" value="2" />
          </div>

          <div className="border border-[#CBCBCB] bg-white">
            <div className="border-b border-[#CBCBCB] px-4 py-3">
              <p className="text-xs font-semibold">Recent tasks</p>
            </div>

            <div>
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="border-b border-[#CBCBCB] px-4 py-4 last:border-b-0"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">
                        {task.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-[#063325]/55">
                        <span>{task.assignee}</span>
                        <span>{task.due}</span>
                        <span>{task.comments} comments</span>

                        {task.attachments > 0 && (
                          <span className="flex items-center gap-1">
                            <Paperclip className="size-3" />
                            {task.attachments}
                          </span>
                        )}
                      </div>
                    </div>

                    <PriorityLabel priority={task.priority} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT OVERVIEW
========================================================= */

function ProjectOverview() {
  return (
    <div className="border border-[#CBCBCB] bg-white">
      <div className="grid sm:grid-cols-[1fr_1fr]">
        <div className="border-b border-[#CBCBCB] p-6 sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#063325]/55">Workspace</p>

              <p className="mt-1 text-sm font-semibold">Acme Studio</p>
            </div>

            <Users className="size-4 text-[#063325]/45" />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#063325]/60">Project progress</span>

              <span className="font-semibold">68%</span>
            </div>

            <div className="mt-3 h-1.5 bg-[#F2F2F2]">
              <div className="h-full w-[68%] bg-[#063325]" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <SmallMetric label="Open tasks" value="18" />

            <SmallMetric label="Completed" value="36" />

            <SmallMetric label="Members" value="12" />

            <SmallMetric label="Files" value="84" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Recent activity</p>

            <Activity className="size-4 text-[#063325]/40" />
          </div>

          <div className="mt-6 space-y-5">
            <ActivityItem text="Anna updated a task" time="2m ago" />

            <ActivityItem text="Jeeson uploaded a file" time="18m ago" />

            <ActivityItem text="Rahul joined the project" time="42m ago" />

            <ActivityItem text="A comment mentioned you" time="1h ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT DASHBOARD
========================================================= */

function ProjectDashboard() {
  return (
    <div className="border border-[#CBCBCB] bg-[#F2F2F2] p-4 sm:p-5">
      <div className="border border-[#CBCBCB] bg-white">
        <div className="flex items-center justify-between border-b border-[#CBCBCB] px-4 py-4">
          <div>
            <p className="text-[10px] text-[#063325]/55">Project overview</p>

            <p className="mt-1 text-sm font-semibold">Backend architecture</p>
          </div>

          <span className="text-xs text-[#063325]/55">Updated 4m ago</span>
        </div>

        <div className="grid divide-y divide-[#CBCBCB] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <DashboardMetric label="Total tasks" value="42" />

          <DashboardMetric label="In progress" value="11" />

          <DashboardMetric label="Completed" value="26" />
        </div>

        <div className="border-t border-[#CBCBCB] p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Team</p>

            <span className="text-[10px] text-[#063325]/50">8 members</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["JV", "AM", "RK", "NS", "PK", "JM"].map((initials) => (
              <span
                key={initials}
                className="flex size-8 items-center justify-center rounded-full border border-[#CBCBCB] bg-[#F2F2F2] text-[9px] font-semibold"
              >
                {initials}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   KANBAN
========================================================= */

function KanbanBoard() {
  const columns = [
    {
      title: "Todo",
      tasks: ["Configure Supabase Storage", "Add Redis rate limiting"],
    },
    {
      title: "In Progress",
      tasks: ["Implement WebSocket gateway", "Setup Prisma schema"],
    },
    {
      title: "Done",
      tasks: ["Authentication flow", "Workspace setup"],
    },
  ];

  return (
    <div className="border border-[#CBCBCB] bg-white p-4 sm:p-5 text-[#063325]">
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.title}>
            <div className="flex items-center justify-between border-b border-[#CBCBCB] pb-3">
              <p className="text-xs font-semibold">{column.title}</p>

              <span className="text-[10px] text-[#063325]/50">
                {column.tasks.length}
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task}
                  className="border border-[#CBCBCB] bg-white p-3"
                >
                  <p className="text-xs font-medium leading-5">{task}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-[#063325]/55">
                      <CalendarDays className="size-3" />
                      Today
                    </div>

                    <span className="flex size-6 items-center justify-center rounded-full bg-[#063325] text-[8px] font-semibold text-white">
                      JV
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-[10px] text-[#063325]/50">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="size-3" />2
                    </span>

                    <span className="flex items-center gap-1">
                      <Paperclip className="size-3" />1
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   COMMENTS
========================================================= */

function CommentsPanel() {
  return (
    <div className="border border-[#CBCBCB] bg-white">
      <div className="border-b border-[#CBCBCB] px-5 py-4">
        <p className="text-xs text-[#063325]/55">Task</p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold">Redesign project dashboard</h3>

          <span className="hidden text-[10px] font-medium text-[#063325] sm:block">
            In Progress
          </span>
        </div>
      </div>

      <div className="space-y-6 p-5">
        <Comment
          initials="AM"
          name="Anna Mathew"
          text="The WebSocket implementation is ready for review. I also attached the latest logs."
        />

        <Comment
          initials="JV"
          name="Jeeson"
          text="I’ll review the live updates and update the task."
        />

        <Comment
          initials="RK"
          name="Rahul K."
          text="The database schema changes are ready on the backend."
        />
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVITY
========================================================= */

function ActivityPanel() {
  return (
    <div className="border border-[#CBCBCB] bg-[#F2F2F2] p-5">
      <div className="flex items-center justify-between border-b border-[#CBCBCB] pb-4">
        <p className="text-xs font-semibold">Recent activity</p>

        <Activity className="size-4 text-[#063325]/45" />
      </div>

      <div className="mt-5 space-y-5">
        <ActivityItem text="Anna updated a task" time="2m ago" />

        <ActivityItem text="Jeeson uploaded schema.sql" time="18m ago" />

        <ActivityItem text="Rahul joined the project" time="42m ago" />

        <ActivityItem text="A comment mentioned you" time="1h ago" />
      </div>
    </div>
  );
}

/* =========================================================
   FILES
========================================================= */

function FilesPanel() {
  const files = [
    ["schema.sql", "Database", "1.2 MB"],
    ["project-brief.pdf", "Document", "1.8 MB"],
    ["api-notes.md", "Document", "24 KB"],
    ["release-assets.zip", "Archive", "4.2 MB"],
  ];

  return (
    <div className="border border-[#CBCBCB] bg-white">
      <div className="border-b border-[#CBCBCB] px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Project files</p>

          <FileText className="size-4 text-[#063325]/45" />
        </div>
      </div>

      <div>
        {files.map(([name, type, size]) => (
          <div
            key={name}
            className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#CBCBCB] px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_120px_80px]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center bg-[#F2F2F2]">
                <FileText className="size-4 text-[#063325]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{name}</p>

                <p className="mt-1 text-[10px] text-[#063325]/50">
                  Added to project
                </p>
              </div>
            </div>

            <span className="hidden text-xs text-[#063325]/55 sm:block">
              {type}
            </span>

            <span className="text-right text-xs text-[#063325]/55">{size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function NotificationPanel() {
  return (
    <div className="border border-[#CBCBCB] bg-white">
      <div className="border-b border-[#CBCBCB] px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Notifications</p>

          <Bell className="size-4 text-[#063325]/45" />
        </div>
      </div>

      <div>
        <Notification
          title="You were mentioned"
          description="Anna mentioned you in Implement WebSocket gateway."
          time="2m ago"
        />

        <Notification
          title="Task assigned to you"
          description="Configure Prisma ORM was assigned to you."
          time="18m ago"
        />

        <Notification
          title="New file uploaded"
          description="schema.sql was added to Backend architecture."
          time="42m ago"
        />

        <Notification
          title="Project member added"
          description="Rahul joined the Backend architecture project."
          time="1h ago"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function PreviewNav({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 text-xs ${
        active ? "bg-[#F2F2F2] font-medium text-[#063325]" : "text-[#063325]/65"
      }`}
    >
      <span className="[&_svg]:size-3.5">{icon}</span>

      {label}
    </div>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#CBCBCB] bg-white p-4">
      <p className="text-[10px] text-[#063325]/55">{label}</p>

      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#CBCBCB] p-3">
      <p className="text-[10px] text-[#063325]/55">{label}</p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function DashboardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5">
      <p className="text-[10px] text-[#063325]/55">{label}</p>

      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function PriorityLabel({ priority }: { priority: string }) {
  return (
    <span
      className={`text-[10px] font-medium ${
        priority === "High"
          ? "text-[#063325]"
          : priority === "Medium"
            ? "text-[#063325]"
            : "text-[#063325]/55"
      }`}
    >
      {priority}
    </span>
  );
}

function Comment({
  initials,
  name,
  text,
}: {
  initials: string;
  name: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#063325] text-[9px] font-semibold text-white">
        {initials}
      </div>

      <div>
        <p className="text-xs font-semibold">{name}</p>

        <p className="mt-1 text-sm leading-6 text-[#063325]/70">{text}</p>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#CBCBCB] pb-4 last:border-b-0">
      <p className="text-xs leading-5 text-[#063325]">{text}</p>

      <span className="shrink-0 text-[10px] text-[#063325]/50">{time}</span>
    </div>
  );
}

function Notification({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="grid gap-3 border-b border-[#CBCBCB] px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-xs font-semibold">{title}</p>

        <p className="mt-1 text-xs leading-5 text-[#063325]/65">
          {description}
        </p>
      </div>

      <span className="text-[10px] text-[#063325]/50">{time}</span>
    </div>
  );
}
