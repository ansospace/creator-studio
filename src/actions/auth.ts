"use server";

import { login, signup } from "../lib/api";
import { ApiError } from "../lib/errors/api.error";
import { ApiResponse } from "../lib/send-response.util";
import { getAccessToken, getRefreshToken, saveAuthTokens } from "../lib/server";
import { LoginSchema, SignUpSchema } from "../types/auth";
import { GetUser } from "../types/user";

export const authenticateUser = async (credentials: LoginSchema): Promise<ApiResponse<GetUser>> => {
  try {
    const response = await login(credentials);
    await saveAuthTokens(response);
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof ApiError ? error.message : "Authentication failed. Please try again.");
  }
};

export const registerUser = async (credentials: SignUpSchema) => {
  try {
    const response = await signup(credentials);
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof ApiError ? error.message : "Failed to sign up user");
  }
};

export const isLoggedIn = async (): Promise<boolean> => {
  if (typeof window !== "undefined") {
    return !!(document.cookie.includes("authorization") && document.cookie.includes("refresh-token"));
  } else {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    return !!(accessToken && refreshToken);
  }
};
