import { LoginSchema, SignUpSchema } from "../types/auth";
import { GetUser } from "../types/user";
import { apiFetch } from "./fetch";
import { ApiResponse } from "./send-response.util";

export const LOGIN = async (credentials: LoginSchema): Promise<Response> => {
  return apiFetch("/api/v1/auth/login", { method: "POST", body: JSON.stringify(credentials) });
};

export const SIGNUP = async (credentials: SignUpSchema): Promise<Response> => {
  return apiFetch("/api/v1/auth/sign-up", { method: "POST", body: JSON.stringify(credentials) });
};

export const LOGOUT = async (): Promise<Response> => {
  return apiFetch("/api/v1/auth/logout", { method: "POST" });
};

export const REFRESH_TOKEN = async (refreshToken: string): Promise<Response> => {
  return apiFetch("/api/v1/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${refreshToken}`,
    },
  });
};

export const GET_USERS = async (): Promise<ApiResponse<{ users: GetUser[] }>> => {
  return apiFetch("/api/v1/users", { method: "GET" }).then((res) => res.json());
};
