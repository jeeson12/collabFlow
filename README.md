# ProjectLoom

> **A full-stack project management and team collaboration platform for modern software teams.**

Plan projects, manage customizable Kanban workflows, collaborate through comments and mentions, receive real-time notifications, and keep project activity organized in one workspace.

[![Live Demo](https://img.shields.io/badge/Live_Demo-projectloom--web.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://projectloom-web.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-23272F?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

---

## Overview

ProjectLoom provides teams with a unified workspace for planning projects, managing tasks, collaborating around work, and tracking project activity.

Teams can manage multiple projects across workspaces, customize board columns, track task lifecycles with drag-and-drop mechanics, discuss details using mentions, upload attachments, and receive real-time notifications when updates occur.

---

## Screenshots

> *UI screenshots and feature walkthroughs will be added here.*

<!-- 
| Workspace & Kanban Board | Task Details & Comments |
|:---:|:---:|
| ![Kanban Board Placeholder](./docs/screenshots/board.png) | ![Task Details Placeholder](./docs/screenshots/task.png) |
-->

---

## Features

### Workspaces & Team Management
- **Workspace CRUD**: Create, view, update, and delete workspaces.
- **Member Management**: Add, update roles for, and remove workspace members.
- **Role-Based Access Control (RBAC)**: Enforced `ADMIN` and `MEMBER` roles.
- **Email Invitations**: Invite colleagues by email with secure acceptance tokens.

### Projects & Kanban Boards
- **Project Organization**: Segment workspace deliverables into distinct projects with unique project keys.
- **Project Membership**: Assign and manage project-level access and roles.
- **Custom Board Columns**: Create, rename, delete, and reorder Kanban columns per project.
- **Drag-and-Drop Workflow**: Interactive task movements powered by `@dnd-kit`.

### Task Management
- **Task Lifecycle**: Create, view, update, and delete tasks.
- **Task Assignment & Scheduling**: Assign tasks to team members and set due dates.
- **Priority Levels**: Flag tasks with `LOW`, `MEDIUM`, `HIGH`, or `URGENT` urgency.
- **Identifiers & Filtering**: Auto-generated custom ticket IDs along with search/filtering.
- **Project Task Statistics**: Aggregated task counts and status overviews.

### Real-Time Collaboration
- **Task Comments**: Contextual discussions attached directly to tasks.
- **User @Mentions**: Tag team members within comments to trigger notifications.
- **Activity & Audit Trail**: Comprehensive logging of actions taken across projects and workspaces.

### Notifications
- **Live Push Notifications**: Instant notification delivery via Socket.IO.
- **Notification State**: Track read and unread alerts.
- **Bulk & Individual Actions**: Mark individual notifications or all notifications as read.

### File Attachments
- **Multi-File Uploads**: Attach documents and assets directly to tasks.
- **Cloud Storage**: Secure file hosting via Supabase Storage.
- **Attachment Management**: View and delete files at the task level.

### Authentication & Security
- **Dual Authentication**: Standard email/password login and Google OAuth 2.0.
- **JWT Authentication**: Authentication tokens are delivered through secure HTTP-only cookies.
- **Password Reset Flow**: Request reset links and update passwords securely.
- **Input Validation**: Strict schema validation using NestJS `ValidationPipe` and `class-validator` with payload whitelisting.
- **Security Headers & CORS**: Hardened with `helmet` and custom CORS policy.

### Transactional Email
- **Email Deliverability**: Integration with Brevo for automated delivery of invitations and password reset emails.

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                      Next.js Frontend                       │
│        (React 19, TanStack Query, Zustand, Tailwind v4)      │
└──────────────┬───────────────────────────────▲──────────────┘
               │                               │
               │ HTTP REST (Axios)             │ WebSockets (Socket.IO)
               ▼                               │
┌──────────────────────────────────────────────┴──────────────┐
│                       NestJS Backend                        │
│         (Modules, Guards, ValidationPipe, Passport)         │
└──────────────┬───────────────┬───────────────┬──────────────┘
               │               │               │
               ▼               ▼               ▼
     ┌──────────────────┐┌───────────┐┌─────────────────┐
     │    PostgreSQL    ││  Supabase ││      Brevo      │
     │   (Prisma ORM)   ││  Storage  ││  (Transactional │
     │                  ││  (Files)  ││     Emails)     │
     └──────────────────┘└───────────┘└─────────────────┘
```

- **Client Layer**: Next.js App Router with interactive React components. TanStack Query manages server state and caching, while Zustand manages local client state.
- **Transport Layer**: RESTful API endpoints for standard operations, supplemented by a Socket.IO gateway for real-time notifications and room events.
- **Server Layer**: Modular NestJS application enforcing authentication guards, validation pipes, and transactional services.
- **Persistence & Services**: PostgreSQL managed through Prisma ORM for relational data integrity, Supabase Storage for task attachments, and Brevo for transactional email delivery.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router framework and routing |
| **React 19** | UI component foundation |
| **TypeScript** | Type safety across application code |
| **Tailwind CSS v4** | Utility-first styling |
| **TanStack Query v5** | Server state management, caching, and mutations |
| **Zustand** | Lightweight client-side state management |
| **@dnd-kit** (`core`, `sortable`) | Accessible drag-and-drop interactions |
| **React Hook Form & Zod** | Client-side form handling and validation |
| **Radix UI & Lucide Icons** | Accessible UI primitives and iconography |
| **Socket.io Client** | Real-time WebSocket communication |
| **Axios** | HTTP client for REST API communication |
| **Sonner** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **NestJS 11** | Modular Node.js backend framework |
| **TypeScript** | Static typing and interfaces |
| **PostgreSQL** | Primary relational database |
| **Prisma ORM 6** | Type-safe schema modeling and database queries |
| **Socket.IO** | WebSocket gateway for real-time events |
| **Passport.js** | Authentication strategies (`jwt`, `google-oauth20`) |
| **class-validator** | Runtime DTO validation and input sanitization |
| **bcrypt** | Secure password hashing |
| **Helmet** | HTTP security headers |

### Infrastructure & Services
| Service | Purpose |
|---|---|
| **Vercel** | Frontend deployment and hosting |
| **Render** | Backend web service hosting |
| **Supabase Storage** | Object storage for attachments and assets |
| **Brevo** | Transactional email delivery service |

---

## Repository Structure

```text
ProjectLoom/
├── client/                     # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                # App router pages and route layouts
│   │   ├── components/         # Shared UI components and primitives
│   │   ├── features/           # Modular domain features (auth, project, workspace, kanban)
│   │   ├── lib/                # API client, Axios config, and Socket client
│   │   ├── providers/          # QueryClient and Theme providers
│   │   └── store/              # Zustand global client stores
│   └── package.json
│
├── server/                     # NestJS Backend Application
│   ├── prisma/                 # Prisma schema & migrations
│   ├── src/
│   │   ├── activity/           # Activity audit logging module
│   │   ├── attachment/         # File attachment and upload module
│   │   ├── auth/               # Auth, JWT, Google OAuth, and password management
│   │   ├── board-column/       # Kanban columns and reordering module
│   │   ├── comment/            # Task comments and @mention handling
│   │   ├── email/              # Transactional email service (Brevo integration)
│   │   ├── notification/       # Notification service and WebSocket gateway
│   │   ├── project/            # Projects and project membership module
│   │   ├── supabase/           # Supabase storage service module
│   │   ├── task/               # Task management and overview statistics
│   │   ├── workspace/          # Workspaces and member invitations
│   │   ├── app.module.ts       # Root NestJS application module
│   │   └── main.ts             # Server entry point, CORS, and global pipes
│   └── package.json
│
├── API.md                      # Complete REST API specification
└── README.md                   # Project documentation
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL Database** instance (local, Supabase, or cloud-hosted)

---

### 1. Clone the Repository

```bash
git clone https://github.com/jeeson12/projectLoom.git
cd projectLoom
```

---

### 2. Backend Setup (`server`)

1. Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   *Configure your PostgreSQL database connection, JWT secret, Supabase, Google OAuth, and Brevo keys.*

3. Run migrations and generate the Prisma client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the backend development server:
   ```bash
   npm run start:dev
   ```
   *The backend will be available at `http://localhost:3001`.*

---

### 3. Frontend Setup (`client`)

1. In a new terminal window, navigate to the `client` directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Ensure `NEXT_PUBLIC_API_URL` is set to your backend instance (`http://localhost:3001` for local development).*

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## API Reference

The ProjectLoom backend exposes modular REST endpoints. For detailed request payloads, parameters, and responses, refer to [`API.md`](./API.md).

| Module | Endpoint Prefix | Summary |
|---|---|---|
| **Auth** | `/auth` | Authentication, OAuth callback, profile, password reset |
| **Workspaces** | `/workspace` | Workspace management, invitations, membership |
| **Projects** | `/project` | Project lifecycle, project membership, available members |
| **Board Columns** | `/board-column` | Column creation, renaming, deletion, reordering |
| **Tasks** | `/task` | Task CRUD, assignment, priority, overview stats |
| **Comments** | `/comment` | Task comments and mention notifications |
| **Attachments** | `/attachment` | Upload and deletion of task files |
| **Notifications** | `/notifications` | Fetching notifications and marking read status |
| **Activity** | `/activity` | Audit log queries for projects and workspaces |

---

## Deployment

ProjectLoom is deployed using managed cloud services:

- **Frontend**: Hosted on [Vercel](https://vercel.com/) with automated deployments from the main branch.
  - Live instance: [https://projectloom-web.vercel.app/](https://projectloom-web.vercel.app/)
- **Backend**: Deployed as a web service on [Render](https://render.com/).
- **Database**: Managed PostgreSQL instance.
- **Storage**: Supabase Storage bucket configured for attachment uploads.
- **Transactional Email**: Brevo API delivering transactional messages.

---

## Engineering Highlights

- **Multi-Tenant Workspace Model**: Relational data schema in PostgreSQL via Prisma that isolates projects and members by workspace.
- **Role-Based Access Control**: Reusable guards in NestJS enforcing authorization across workspace and project operations.
- **Secure Authentication Pipeline**: Combined local authentication with Google OAuth 2.0, using HTTP-only cookies for JWT transmission to reduce exposure of authentication tokens to client-side JavaScript.
- **Real-Time Gateway Architecture**: Socket.IO integrated with NestJS to manage user rooms and broadcast real-time notification events.
- **Server & Client State Separation**: Implemented server-state caching, query invalidation, and mutations with TanStack Query v5 alongside local Zustand state management.
- **Strict Input Validation**: Global ValidationPipe enforcing DTO decorators (`class-validator`), rejecting unwhitelisted properties to prevent parameter tampering.
- **Feature-Oriented Frontend Architecture**: Modular folder design dividing code by domain boundaries for maintainability and clean separation of concerns.

---

## Roadmap

- [ ] Calendar and timeline views
- [ ] Advanced project analytics
- [ ] Recurring tasks
- [ ] Rich-text task descriptions
- [ ] Advanced notification preferences
- [ ] Enhanced workspace-wide search

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**ProjectLoom** — *Plan. Collaborate. Ship.*

</div>
