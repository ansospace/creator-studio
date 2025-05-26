"use server";

import { ENV_CONFIG } from "@/constants";
import { LoginSchema, SignUpResponse, SignUpSchema } from "@/types/auth";

import { OtpEvent, OtpVerifyEvent } from "../../types";
import { POST } from "../apiClient";
import { IApiResponse } from "../send-response.util";
import { getAccessToken, getRefreshToken } from "../server";

// Keep getAccessToken/getRefreshToken for isLoggedIn

const AUTH_API_URL = ENV_CONFIG.SERVICES.USER_API_URL;

interface LoginResponse {
  userId: string;
}

/**
 * Authenticates a user with their credentials
 */
export const loginUser = async (body: LoginSchema): Promise<IApiResponse<LoginResponse>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/sign-in`;
  return POST<LoginResponse>(url, { body });
};

/**
 * Registers a new user
 */
export const signup = async (body: SignUpSchema): Promise<IApiResponse<SignUpResponse>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/sign-up`;
  return POST(url, { body });
};

/**
 * Logs out the current user
 */
export const logout = async (): Promise<IApiResponse<void>> => {
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

export const verifyOtp = async (body: OtpVerifyEvent): Promise<IApiResponse<any>> => {
  const url = `${AUTH_API_URL}/api/v1/otp/verify`;
  return POST(url, { body });
};

export const sendOtp = async (body: OtpEvent): Promise<IApiResponse<{ token?: string }>> => {
  const url = `${AUTH_API_URL}/api/v1/otp`;
  return POST(url, { body });
};
