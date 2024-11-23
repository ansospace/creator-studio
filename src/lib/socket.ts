/* eslint-disable no-console */
import { Socket, io } from "socket.io-client";

import { ENV_CONFIG } from "@/constants";
import { SocketEventKey, SocketEvents } from "@/types/socket";

import { getAccessToken } from "./server";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  async connect(): Promise<Socket> {
    if (this.socket) return this.socket;

    const token = await getAccessToken();

    this.socket = io(ENV_CONFIG.SERVICES.USER_API_URL || "", {
      auth: {
        token,
      },
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
    return this.socket;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Socket connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    this.socket.on("error", (error: Error) => {
      console.error("Socket error:", error);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit<T extends SocketEventKey>(event: T, data: SocketEvents[T]) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on<T>(event: string, callback: (data: T) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off<T>(event: string, callback?: (data: T) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export const socketService = SocketService.getInstance();
