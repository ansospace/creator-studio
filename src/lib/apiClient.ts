"use server";

import { ENV_CONFIG } from "@/constants";

import { ApiResponse } from "./send-response.util";
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from "./server";

interface RequestOptions extends RequestInit {
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  _retry?: boolean; // Flag to prevent infinite loops on retries
}

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

type Method = "GET" | "POST" | "PUT" | "DELETE";
type URL = string;

// Interface for queue items
interface QueueItem {
  url: URL;
  method: Method;
  options: RequestOptions;
  resolve: (value: any) => void; // Resolve with the result of the retried request
  reject: (error: unknown) => void;
}

// Store for tracking refresh token requests
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, accessToken: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // Retry the request with the new token
      request(prom.method, prom.url, {
        ...prom.options,
        headers: {
          ...prom.options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
        _retry: true, // Mark as retried
      })
        .then(prom.resolve)
        .catch(prom.reject);
    }
  });

  failedQueue = [];
};

// Helper function to handle fetch responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  // Check if the response is JSON
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (isJson) {
    const data = await response.json();
    return data as ApiResponse<T>;
  } else {
    // Handle non-JSON responses
    const text = await response.text();
    return {
      status: response.ok ? "success" : "failed",
      message: text || response.statusText,
      data: undefined as unknown as T,
    };
  }
}

async function request<T>(method: Method, url: URL, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  try {
    // Prepare the request options
    const { body, _retry, ...fetchOptions } = options; // Extract _retry

    // Get the access token
    const accessToken = await getAccessToken();

    // Prepare headers
    const headers = new Headers(fetchOptions.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Origin", ENV_CONFIG.APP.URL || "");

    // Add Authorization header if token exists and not already set
    if (accessToken && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    // Make the request
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...fetchOptions,
    });

    // --- Token saving logic for auth endpoints ---
    // Check if the response is from an auth endpoint that returns tokens
    if (url.includes("/auth/sign-in") || url.includes("/auth/refresh-token")) {
      const newAccessToken = response.headers.get("authorization");
      const newRefreshToken = response.headers.get("refresh-token");

      if (newAccessToken) {
        await saveAccessToken(newAccessToken);
      }
      if (newRefreshToken) {
        await saveRefreshToken(newRefreshToken);
      }
    }
    // --- End token saving logic ---

    // --- 401 Handling and Refresh Token Logic ---
    if (response.status === 401 && !_retry) {
      // If it's the sign-in endpoint, it's invalid credentials, not an expired token
      if (url.includes("/auth/sign-in")) {
        // Process the response for sign-in failure
        return await handleResponse<T>(response);
      }

      // If not sign-in and 401, it's likely an expired token
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise<ApiResponse<T>>((resolve, reject) => {
          failedQueue.push({ url, method, options, resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          // No refresh token available, redirect to login (client-side)
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          // Or throw an error for server-side
          throw new Error("No refresh token available");
        }

        // Call the refresh token endpoint
        const refreshResponse = await fetch(`${ENV_CONFIG.SERVICES.USER_API_URL}/api/v1/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
            Origin: ENV_CONFIG.APP.URL || "",
          },
        });

        if (refreshResponse.ok) {
          const newAccessToken = refreshResponse.headers.get("authorization");
          const newRefreshToken = refreshResponse.headers.get("refresh-token");

          if (newAccessToken && newRefreshToken) {
            await saveAccessToken(newAccessToken);
            await saveRefreshToken(newRefreshToken);

            // Process queued requests with the new token
            processQueue(null, newAccessToken);

            // Retry the original request
            return request<T>(method, url, { ...options, _retry: true });
          } else {
            // Refresh successful but tokens not returned as expected
            processQueue(new Error("Refresh token response missing tokens"), null);
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
            throw new Error("Refresh token response missing tokens");
          }
        } else {
          // Refresh token request failed (e.g., refresh token expired)
          processQueue(new Error("Refresh token failed"), null);
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          throw new Error("Refresh token failed");
        }
      } catch (refreshError) {
        // Handle errors during the refresh process
        processQueue(refreshError, null);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw refreshError; // Re-throw the error
      } finally {
        isRefreshing = false;
      }
    }
    // --- End 401 Handling ---

    // Handle the response for non-401 or retried requests
    const result = await handleResponse<T>(response);

    return result;
  } catch (error: any) {
    // Handle network errors or errors thrown during refresh
    return {
      status: "failed",
      message: error.message || "Network error",
      data: undefined as unknown as T,
    };
  }
}

export const GET = async <T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  return request<T>("GET", url, options);
};

export const POST = async <T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  return request<T>("POST", url, options);
};

export const PUT = async <T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  return request<T>("PUT", url, options);
};

export const DELETE = async <T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  return request<T>("DELETE", url, options);
};
