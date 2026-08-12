# CollabFlow API Documentation

This document outlines the REST API endpoints available in the CollabFlow backend.
All protected endpoints require a valid JWT token sent in the `Authorization` header as a Bearer token or stored in an HTTP-only cookie.

## Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user with email and password | No |
| POST | `/auth/login` | Authenticate a user and return a JWT | No |
| GET | `/auth/google` | Initiate Google OAuth2 login flow | No |
| GET | `/auth/google/callback` | Google OAuth2 callback URL | No |
| GET | `/auth/me` | Get the currently authenticated user's profile | Yes |
| POST | `/auth/logout` | Log out the user (clears session/cookie) | Yes |
| POST | `/auth/forgot-password` | Request a password reset email | No |
| POST | `/auth/reset-password` | Reset password using a token | No |

## Workspaces (`/workspace`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/workspace` | Create a new workspace | Yes |
| GET | `/workspace` | Get all workspaces for the authenticated user | Yes |
| GET | `/workspace/:workspaceId` | Get details of a specific workspace | Yes |
| PATCH | `/workspace/:workspaceId` | Update a workspace (e.g., name, settings) | Yes |
| DELETE | `/workspace/:workspaceId` | Delete a workspace | Yes |
| GET | `/workspace/:workspaceId/members` | List all members of a workspace | Yes |
| PATCH | `/workspace/:workspaceId/member/:targetUserId` | Update a member's role in the workspace | Yes |
| DELETE | `/workspace/:workspaceId/members/:targetUserId`| Remove a member from the workspace | Yes |
| POST | `/workspace/:workspaceId/invite` | Send an email invitation to join a workspace | Yes |
| GET | `/workspace/invitations/:token` | Validate an invitation token | No/Yes |
| POST | `/workspace/invitations/:token/accept` | Accept an invitation to join a workspace | Yes |

## Projects (`/project`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/project` | Create a new project within a workspace | Yes |
| GET | `/project` | Get all projects the user has access to | Yes |
| GET | `/project/workspace/:workspaceId` | Get all projects belonging to a specific workspace | Yes |
| GET | `/project/:projectId` | Get details of a specific project | Yes |
| PATCH | `/project/:projectId` | Update a project's details | Yes |
| DELETE | `/project/:projectId` | Delete a project | Yes |
| POST | `/project/:projectId/member` | Add a member to a project | Yes |
| GET | `/project/:projectId/members` | Get all members of a project | Yes |
| PATCH | `/project/:projectId/member/:targetId` | Update a member's role in a project | Yes |
| DELETE | `/project/:projectId/member/:targetId` | Remove a member from a project | Yes |
| GET | `/project/:projectId/members/available`| Get workspace members not yet in the project | Yes |

## Board Columns (`/board-column`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/board-column` | Create a new Kanban column in a project | Yes |
| GET | `/board-column/project/:projectId` | Get all columns for a specific project | Yes |
| PATCH | `/board-column/reorder` | Update the order/sequence of columns | Yes |
| PATCH | `/board-column/:columnId` | Update column details (e.g., name) | Yes |
| DELETE | `/board-column/:columnId` | Delete a column and its associated tasks | Yes |

## Tasks (`/task`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/task` | Create a new task (supports multipart/form-data for attachments) | Yes |
| GET | `/task/my-task` | Get all tasks assigned to the authenticated user | Yes |
| GET | `/task/project/:projectId` | Get all tasks for a specific project | Yes |
| GET | `/task/project/:projectId/stats` | Get statistics/overview of tasks in a project | Yes |
| PATCH | `/task/:id` | Update a task (e.g., move to another column, assign) | Yes |
| DELETE | `/task/:id` | Delete a task | Yes |

## Comments (`/comment`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/comment` | Add a comment to a task | Yes |
| GET | `/comment/task/:taskId` | Get all comments for a specific task | Yes |
| PATCH | `/comment/:commentId` | Update an existing comment | Yes |
| DELETE | `/comment/:commentId` | Delete a comment | Yes |

## Attachments (`/attachment`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/attachment/:taskId` | Upload files and attach them to a task | Yes |
| DELETE | `/attachment/:id` | Delete an attachment | Yes |

## Activity Logs (`/activity`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/activity/workspace/:workspaceId` | Get activity audit logs for a workspace | Yes |
| GET | `/activity/project/:projectId` | Get activity audit logs for a project | Yes |

## Notifications (`/notification`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/notification/project/:projectId` | Get notifications for a project | Yes |
| PATCH | `/notification/mark-all-read` | Mark all unread notifications as read | Yes |
| PATCH | `/notification/:id/read` | Mark a specific notification as read | Yes |

---
**Note:** WebSocket events (via Socket.IO) are used alongside these REST endpoints to push real-time updates for tasks, comments, and project activities to connected clients.
