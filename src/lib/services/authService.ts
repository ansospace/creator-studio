"use server";

import { console } from "inspector";

import { ENV_CONFIG } from "@/constants";
import { IApiResponse, LoginSchema, OtpEvent, SignUpResponse, SignUpSchema, VerifyOTPSchema } from "@/types";

import { GET, POST } from "../apiClient";
import { getAccessToken, getRefreshToken } from "../server";

const AUTH_API_URL = ENV_CONFIG.SERVICES.USER_API_URL;

interface LoginResponse {
  userId: string;
}

export const loginUser = async (body: LoginSchema): Promise<IApiResponse<LoginResponse>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/sign-in`;
  return POST<LoginResponse>(url, { body });
};

export const signup = async (body: SignUpSchema): Promise<IApiResponse<SignUpResponse>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/sign-up`;
  return POST(url, { body });
};

export const checkUsernameAvailability = async (data: {
  username: string;
}): Promise<IApiResponse<{ available: boolean }>> => {
  const url = `${AUTH_API_URL}/api/v1/users/check-username/${data.username}`;
  console.log("Checking username availability at:", url);
  return GET<{ available: boolean }>(url);
};

export const logout = async (): Promise<IApiResponse<void>> => {
  const url = `${AUTH_API_URL}/api/v1/auth/logout`;
  return POST<void>(url);
};

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

export const verifyOtp = async <T>(body: VerifyOTPSchema): Promise<IApiResponse<{ actionToken: T }>> => {
  const url = `${AUTH_API_URL}/api/v1/otp/verify`;
  return POST(url, { body });
};

export const sendOtp = async (body: OtpEvent): Promise<IApiResponse<{ token?: string }>> => {
  const url = `${AUTH_API_URL}/api/v1/otp`;
  return POST(url, { body });
};
