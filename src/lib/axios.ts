import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { ENV_CONFIG } from "@/constants";

import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from "./server";

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIG.SERVICES.USER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define interface for queue items
interface QueueItem {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (error: unknown) => void;
}

// Store for tracking refresh token requests
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || "");
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If there's no response, just reject the promise
    if (!error.response) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors (token expired)
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, add request to queue
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = "/login";
          return Promise.reject(error);
        }
        // Call your refresh token endpoint
        const response = await axios.post(
          `${ENV_CONFIG.SERVICES.USER_API_URL}/api/v1/auth/refresh-token`,
          {}, // Empty request body or add any required payload here
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.status === 200) {
          const accessToken = response.headers.authorization;
          const newRefreshToken = response.headers["refresh-token"];

          if (accessToken && newRefreshToken) {
            await saveAccessToken(accessToken);
            await saveRefreshToken(newRefreshToken);

            // Update authorization header
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            // Process queued requests
            processQueue(null, accessToken);

            // Retry the original request
            return axiosInstance(originalRequest);
          }
        } else {
          // If refresh token request doesn't return a new token
          processQueue(error, null);
          //   window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If refresh token request fails
        processQueue(refreshError, null);
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else if (error.response.status === 403) {
      // Handle forbidden error
      // Redirect to forbidden page or perform any other action
      window.location.href = "/forbidden";
    }

    return Promise.reject(error);
  }
);
