"use server";

import { cookies } from "next/headers";

import { COOKIES } from "../constants/app.constants";

export const saveAccessToken = async (token: string) => {
  (await cookies()).set({
    name: COOKIES.AUTHORIZATION,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const saveRefreshToken = async (token: string) => {
  (await cookies()).set({
    name: COOKIES.REFRESH_TOKEN,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const getRefreshToken = async () => {
  return (await cookies()).get(COOKIES.REFRESH_TOKEN)?.value;
};

export const getAccessToken = async () => {
  return (await cookies()).get(COOKIES.AUTHORIZATION)?.value;
};

export const getCookie = async (name: COOKIES) => {
  return (await cookies()).get(name)?.value;
};

export const saveCookie = async (name: COOKIES, value: string) => {
  (await cookies()).set({
    name,
    value,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const deleteCookie = async (name: COOKIES) => {
  (await cookies()).delete(name);
};

const extractCookiesFromHeader = (setCookieHeader: string | null): { name: string; value: string }[] => {
  if (!setCookieHeader) return [];

  return setCookieHeader.split(",").map((cookie) => {
    const [cookieStr] = cookie.split(";");
    const [name, value] = cookieStr.trim().split("=");
    return { name, value };
  });
};

export const saveAuthTokens = async (response: Response) => {
  const authToken = response.headers.get(COOKIES.AUTHORIZATION);
  const setCookieHeader = response.headers.get("set-cookie");

  if (!authToken || !setCookieHeader) {
    return false;
  }

  const cookies = extractCookiesFromHeader(setCookieHeader);

  // Save auth token to cookies instead of directly manipulating headers
  await saveCookie(COOKIES.AUTHORIZATION, authToken);

  // Save other cookies
  for (const { name, value } of cookies) {
    await saveCookie(name as COOKIES, value);
  }

  return true;
};
