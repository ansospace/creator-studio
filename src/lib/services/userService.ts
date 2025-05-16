"use server";

import type { GetUser, Profile, ProfileSchema } from "@/types";

// New generic HTTP client
import { ENV_CONFIG } from "../../constants";
import { GET, PUT } from "../apiClient";
import { ApiResponse } from "../send-response.util";

const USER_API_BASE_URL = ENV_CONFIG.SERVICES.USER_API_URL;

export const getUsers = async (): Promise<ApiResponse<{ users: GetUser[] }>> => {
  return GET<{ users: GetUser[] }>(`${USER_API_BASE_URL}/api/v1/users`);
};

export const getUser = async (username: string): Promise<ApiResponse<GetUser>> => {
  return GET<GetUser>(`${USER_API_BASE_URL}/api/v1/users/${username}`);
};

export const upsertProfile = async (data: ProfileSchema): Promise<ApiResponse<ProfileSchema>> => {
  return PUT<ProfileSchema>(`${USER_API_BASE_URL}/api/v1/profile`, { body: data });
};

export const getProfile = async (): Promise<ApiResponse<Profile>> => {
  return GET<Profile>(`${USER_API_BASE_URL}/api/v1/profile`);
};

// ... other user-related API functions
