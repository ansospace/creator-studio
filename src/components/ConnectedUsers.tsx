"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/hooks";
import { useToast } from "@/hooks/useToast";
import { UserConnectionEvent } from "@/types/socket";

interface ConnectedUser {
  userId: string;
  timestamp: number;
}

export const ConnectedUsers = () => {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const socket = useSocket();
  const { toast } = useToast();

  useEffect(() => {
    if (!socket) return;

    // Get initial connected users
    socket.emit("get:connected-users");

    const handleUserConnected = (data: UserConnectionEvent) => {
      setConnectedUsers((prev) => {
        if (prev.some((user) => user.userId === data.userId)) {
          return prev;
        }

        // Show toast notification after state update
        setTimeout(() => {
          toast({
            title: "User Connected",
            description: `User ${data.userId} has joined`,
          });
        }, 0);

        return [...prev, data];
      });
    };

    const handleUserDisconnected = (data: UserConnectionEvent) => {
      setConnectedUsers((prev) => {
        // Show toast notification after state update
        setTimeout(() => {
          toast({
            title: "User Disconnected",
            description: `User ${data.userId} has left`,
            variant: "destructive",
          });
        }, 0);

        return prev.filter((user) => user.userId !== data.userId);
      });
    };

    const handleInitialUsers = (users: ConnectedUser[]) => {
      setConnectedUsers(users);
    };

    socket.on("user:connected", handleUserConnected);
    socket.on("user:disconnected", handleUserDisconnected);
    socket.on("connected:users", handleInitialUsers);

    return () => {
      socket.off("user:connected", handleUserConnected);
      socket.off("user:disconnected", handleUserDisconnected);
      socket.off("connected:users", handleInitialUsers);
    };
  }, [socket, toast]);

  if (!socket) {
    return <div className="text-muted-foreground">Connecting...</div>;
  }

  if (connectedUsers.length === 0) {
    return <div className="text-muted-foreground">No users connected</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Connected Users ({connectedUsers.length})</h2>
      <div className="grid gap-4">
        {connectedUsers.map((user) => (
          <div key={user.userId} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${user.userId}`} />
              <AvatarFallback>{user.userId[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.userId}</span>
              <span className="text-sm text-muted-foreground">
                Connected {new Date(user.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
