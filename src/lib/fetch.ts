import { ENV_CONFIG } from "@/constants";

import { API_ERROR_MESSAGES } from "./constants/error.constants";
import { ApiError } from "./errors/api.error";
import { ApiResponse } from "./send-response.util";
import { getAccessToken } from "./server";

type FetchOptions = RequestInit & {
  baseURL?: string;
};

export const createFetchConfig = async (options: FetchOptions = {}): Promise<RequestInit> => {
  const baseURL = ENV_CONFIG.SERVICES.USER_API_URL;
  const isServer = typeof window === "undefined";

  if (!baseURL) {
    throw new ApiError(API_ERROR_MESSAGES.INVALID_CONFIG);
  }

  // Get stored authorization header
  const authHeader = await getAccessToken();

  return {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: isServer ? ENV_CONFIG.APP.URL || "" : window.location.origin,
      ...(authHeader ? { Authorization: authHeader } : {}),
      ...options.headers,
    },
  };
};

export const apiFetch = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
  const config = await createFetchConfig(options);
  const baseURL = ENV_CONFIG.SERVICES.USER_API_URL;

  if (!baseURL) {
    throw new ApiError(API_ERROR_MESSAGES.INVALID_CONFIG);
  }

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseURL}${normalizedEndpoint}`;

  try {
    return await fetch(url, config as RequestInit);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      // Handle ECONNREFUSED and other network errors
      if (error.message.includes("ECONNREFUSED")) {
        throw new ApiError(API_ERROR_MESSAGES.CONNECTION_REFUSED);
      }

      throw new ApiError(API_ERROR_MESSAGES.NETWORK_ERROR);
    }

    throw new ApiError(API_ERROR_MESSAGES.SERVER_ERROR);
  }
};

export const ProtectedFetch = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  const accessToken = await getAccessToken();

  const res = await apiFetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken || "",
    },
  });

  return res.json();
};

// Helper methods for different HTTP methods
export const GET = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return await ProtectedFetch<T>(endpoint, { ...options, method: "GET" });
};

export const POST = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return await ProtectedFetch<T>(endpoint, { ...options, method: "POST" });
};

export const PUT = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return await ProtectedFetch<T>(endpoint, { ...options, method: "PUT" });
};

export const DELETE = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return await ProtectedFetch<T>(endpoint, { ...options, method: "DELETE" });
};
