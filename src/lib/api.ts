import type {
  Course,
  CourseFilterRequest,
  CourseFilterResponse,
  GetUser,
  LoginSchema,
  Profile,
  ProfileSchema,
  SignUpSchema,
} from "@/types";

import { ENV_CONFIG } from "../constants";
import { apiFetch } from "./fetch";
import { ApiResponse } from "./send-response.util";
import { getAccessToken } from "./server";

export const login = async (credentials: LoginSchema): Promise<Response> => {
  return apiFetch({
    endpoint: "/api/v1/auth/login",
    options: {
      method: "POST",
      body: JSON.stringify(credentials),
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  });
};

export const signup = async (credentials: SignUpSchema): Promise<Response> => {
  return apiFetch({
    endpoint: "/api/v1/auth/sign-up",
    options: {
      method: "POST",
      body: JSON.stringify(credentials),
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  });
};

export const logout = async (): Promise<Response> => {
  return apiFetch({
    endpoint: "/api/v1/auth/logout",
    options: {
      method: "POST",
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  });
};

export const refreshToken = async (refreshToken: string): Promise<Response> => {
  return apiFetch({
    endpoint: "/api/v1/auth/refresh-token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${refreshToken}`,
      },
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  }).then((res) => res.json());
};

export const getUsers = async (): Promise<ApiResponse<{ users: GetUser[] }>> => {
  return apiFetch({
    endpoint: "/api/v1/users",
    options: {
      method: "GET",
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  }).then((res) => res.json());
};

export const getUser = async (username: string): Promise<ApiResponse<GetUser>> => {
  return apiFetch({
    endpoint: `/api/v1/users/${username}`,
    options: {
      method: "GET",
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  }).then((res) => res.json());
};

export const updateProfile = async (data: ProfileSchema) => {
  const accessToken = await getAccessToken();
  return apiFetch({
    endpoint: "/api/v1/profile",
    options: {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  }).then((res) => res.json());
};

export const getProfile = async (): Promise<ApiResponse<Profile>> => {
  const accessToken = await getAccessToken();
  return apiFetch({
    endpoint: "/api/v1/profile",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    baseURL: ENV_CONFIG.SERVICES.USER_API_URL || "",
  }).then((res) => res.json());
};

export const getCourses = async (): Promise<ApiResponse<{ courses: Course[] }>> => {
  return apiFetch({
    endpoint: "/api/v1/courses",
    options: {
      method: "GET",
    },
    baseURL: ENV_CONFIG.SERVICES.ACS_API_URL || "sd",
  }).then((res) => res.json());
};

export const filterCourses = async (filters: CourseFilterRequest): Promise<ApiResponse<CourseFilterResponse>> => {
  return apiFetch({
    endpoint: "/api/v1/courses/filter",
    options: {
      method: "POST",
      body: JSON.stringify(filters),
    },
    baseURL: ENV_CONFIG.SERVICES.ACS_API_URL,
  }).then((res) => res.json());
};

export const createCourse = async (course: Course): Promise<ApiResponse<Course>> => {
  const accessToken = await getAccessToken();
  try {
    const res = await apiFetch({
      endpoint: "/api/v1/courses",
      options: {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      baseURL: ENV_CONFIG.SERVICES.ACS_API_URL,
    });
    return await res.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return { status: "failed", data: undefined, message: "Failed to create course" };
  }
};

export const getCourse = async (courseId: string): Promise<ApiResponse<{ course: Course }>> => {
  return apiFetch({
    endpoint: `/api/v1/courses/${courseId}`,
    options: {
      method: "GET",
    },
    baseURL: ENV_CONFIG.SERVICES.ACS_API_URL,
  }).then((res) => res.json());
};
