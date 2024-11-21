"use server";

import { cookies } from "next/headers";

export const saveAccessToken = (token: string) => {
  cookies().set({
    name: "authorization",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const saveRefreshToken = (token: string) => {
  cookies().set({
    name: "refresh-token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const getRefreshToken = async () => {
  return cookies().get("refresh-token")?.value;
};

export const getAccessToken = async () => {
  return cookies().get("authorization")?.value;
};

export const saveCookie = (name: string, value: string) => {
  cookies().set({
    name,
    value,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
export interface IApiResponse<T = undefined> {
  response: Response;
  statusCode: number;
  status: "success" | "failed";
  message: string;
  data: T;
}

const extractCookiesFromHeader = (setCookieHeader: string | null): { name: string; value: string }[] => {
  if (!setCookieHeader) return [];

  return setCookieHeader.split(",").map((cookie) => {
    const [cookieStr] = cookie.split(";");
    const [name, value] = cookieStr.trim().split("=");
    return { name, value };
  });
};

export const saveAuthTokens = async (response: Response) => {
  const authToken = response.headers.get("authorization");
  const setCookieHeader = response.headers.get("set-cookie");

  if (!authToken || !setCookieHeader) {
    return false;
  }

  const cookies = extractCookiesFromHeader(setCookieHeader);

  // Save auth token to cookies instead of directly manipulating headers
  saveCookie("authorization", authToken);

  // Save other cookies
  for (const { name, value } of cookies) {
    saveCookie(name, value);
  }

  return true;
};
