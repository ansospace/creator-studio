export type UserConnectionEvent = {
  userId: string;
  timestamp: number;
};

export type UserUpdateEvent = {
  userId: string;
  updates: {
    field: string;
    value: unknown;
  }[];
};

export type NotificationEvent = {
  id: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  timestamp: number;
};

export type SocketEvents = {
  "user:connected": UserConnectionEvent;
  "user:disconnected": UserConnectionEvent;
  "user:updated": UserUpdateEvent;
  "notification:received": NotificationEvent;
};

export type SocketEventKey = keyof SocketEvents;
