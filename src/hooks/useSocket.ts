"use client";

import { useEffect, useRef, useState } from "react";

import { Socket } from "socket.io-client";

import { socketService } from "@/lib/socket";
import { useAppSelector } from "@/redux/store";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketInitialized = useRef(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || socketInitialized.current) return;

    const initSocket = async () => {
      try {
        const newSocket = await socketService.connect();
        setSocket(newSocket);
        socketInitialized.current = true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Socket connection failed:", error);
      }
    };

    initSocket();

    return () => {
      socketService.disconnect();
      socketInitialized.current = false;
      setSocket(null);
    };
  }, [isAuthenticated]);

  return socket;
};
