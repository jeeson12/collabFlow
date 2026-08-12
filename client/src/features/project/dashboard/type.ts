export interface ProjectMember {
  userId: string;
  projectId: string;
  role: "ADMIN" | "MEMBER";
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface TaskStats {
  total: number;
  overdue: number;

  columns: {
    id: string;
    name: string;
    order: number;
    total: number;
    isCompletionColumn: boolean;
  }[];
}

export interface AvailableMember {
  id: string;
  name: string;
  email: string;
}

export interface Activity {
  id: string;
  message: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
  };
}

export interface Attachment {
  id: string;
  originalFileName: string;
  mimeType: string;
  fileSize: number;
  uploader: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export type Notification = {
  id: string;
  title: string;
  message: string;
  entityId?: string | null;
  entityType?: string | null;
  projectId?: string | null;
  workspaceId?: string | null;
  readAt?: string | null;
  createdAt: string;
};

export type NotificationsResponse = {
  notifications: Notification[];
  unreadCount: number;
};
