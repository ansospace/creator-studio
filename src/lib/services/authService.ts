"use server";

import { ENV_CONFIG } from "@/constants";
import { LoginSchema, SignUpSchema } from "@/types/auth";

import { POST } from "../apiClient";
import { ApiResponse } from "../send-response.util";
import { getAccessToken, getRefreshToken } from "../server";

// Keep getAccessToken/getRefreshToken for isLoggedIn

const AUTH_API_URL = ENV_CONFIG.SERVICES.USER_API_URL;

interface LoginResponse {
  userId: string;
}

/**
 * Authenticates a user with their credentials
 */
export const loginUser = async (credentials: LoginSchema): Promise<ApiResponse<LoginResponse>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/sign-in`;

  // The apiClient now handles token extraction and storage for this endpoint
  const response = await POST<LoginResponse>(url, {
    body: credentials,
  });

  return response;
};

/**
 * Registers a new user
 */
export const signup = async (credentials: SignUpSchema): Promise<ApiResponse<any>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/sign-up`;

  return POST(url, {
    body: credentials,
  });
};

/**
 * Logs out the current user
 */
export const logout = async (): Promise<ApiResponse<void>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/logout`;

  return POST<void>(url);
};

/**
 * Checks if the user is currently logged in
 */
export const isLoggedIn = async (): Promise<boolean> => {
  // This logic still relies on checking for tokens, which is fine
  if (typeof window !== "undefined") {
    // Client-side check (might need adjustment depending on how tokens are stored - cookies vs localStorage)
    return !!(document.cookie.includes("authorization") && document.cookie.includes("refresh-token"));
  } else {
    // Server-side check using server.ts functions
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    return !!(accessToken && refreshToken);
  }
};
