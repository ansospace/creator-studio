"use server";

import type { Course } from "@/types";

// New generic HTTP client
import { ENV_CONFIG } from "../../constants";
import { GET, POST } from "../apiClient";
import { ApiResponse } from "../send-response.util";

const COURSE_API_BASE_URL = ENV_CONFIG.SERVICES.ACS_API_URL;

export const getCourses = async (): Promise<ApiResponse<{ courses: Course[] }>> => {
  return GET<{ courses: Course[] }>(`${COURSE_API_BASE_URL}/api/v1/courses`);
};

export const createCourse = async (course: Course): Promise<ApiResponse<Course>> => {
  return POST<Course>(`${COURSE_API_BASE_URL}/api/v1/courses`, { body: course });
};

export const getCourse = async (courseId: string): Promise<ApiResponse<{ course: Course }>> => {
  return GET<{ course: Course }>(`${COURSE_API_BASE_URL}/api/v1/courses/${courseId}`);
};
