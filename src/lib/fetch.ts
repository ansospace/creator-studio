import { envConstants } from "./constants/env.constant";
import { ApiResponse } from "./send-response.util";
import { getAccessToken } from "./server";

type FetchOptions = RequestInit & {
  baseURL?: string;
};

export const createFetchConfig = async (options: FetchOptions = {}): Promise<RequestInit> => {
  const baseURL = envConstants.NEXT_PUBLIC_USER_SERVICE_BASE_URL;
  const isServer = typeof window === "undefined";

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_USER_SERVICE_BASE_URL is not configured");
  }

  // Get stored authorization header
  const authHeader = await getAccessToken();

  return {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: isServer ? envConstants.NEXT_PUBLIC_APP_URL : window.location.origin,
      ...(authHeader ? { Authorization: authHeader } : {}),
      ...options.headers,
    },
  };
};

export const apiFetch = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
  const config = await createFetchConfig(options);
  const baseURL = envConstants.NEXT_PUBLIC_USER_SERVICE_BASE_URL;

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_USER_SERVICE_BASE_URL is not configured");
  }

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseURL}${normalizedEndpoint}`;

  return fetch(url, config as RequestInit);
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
  return ProtectedFetch<T>(endpoint, { ...options, method: "GET" });
};

export const POST = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return ProtectedFetch<T>(endpoint, { ...options, method: "POST" });
};

export const PUT = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return ProtectedFetch<T>(endpoint, { ...options, method: "PUT" });
};

export const DELETE = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return ProtectedFetch<T>(endpoint, { ...options, method: "DELETE" });
};
