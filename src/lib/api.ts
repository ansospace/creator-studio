import type { UpdateUser } from "@/types/user";

import { LoginSchema, SignUpSchema } from "../types/auth";
import { GetUser } from "../types/user";
import { apiFetch } from "./fetch";
import { ApiResponse } from "./send-response.util";

export const login = async (credentials: LoginSchema): Promise<Response> => {
  return apiFetch("/api/v1/auth/login", { method: "POST", body: JSON.stringify(credentials) });
};

export const signup = async (credentials: SignUpSchema): Promise<Response> => {
  return apiFetch("/api/v1/auth/sign-up", { method: "POST", body: JSON.stringify(credentials) });
};

export const logout = async (): Promise<Response> => {
  return apiFetch("/api/v1/auth/logout", { method: "POST" });
};

export const refreshToken = async (refreshToken: string): Promise<Response> => {
  return apiFetch("/api/v1/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${refreshToken}`,
    },
  });
};

export const getUsers = async (): Promise<ApiResponse<{ users: GetUser[] }>> => {
  return apiFetch("/api/v1/users", { method: "GET" }).then((res) => res.json());
};

export const getUser = async (username: string): Promise<ApiResponse<GetUser>> => {
  return apiFetch(`/api/v1/users/${username}`, { method: "GET" }).then((res) => res.json());
};

export const updateProfile = async (data: UpdateUser) => {
  return apiFetch("/api/v1/users/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
