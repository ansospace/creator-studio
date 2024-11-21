import { cookies } from "next/headers";

export interface CookieOptions {
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  httpOnly?: boolean;
  path?: string;
  maxAge?: number;
  domain?: string;
  expires?: Date;
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  const defaultOptions: CookieOptions = {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
    path: "/",
  };

  const cookieOptions = {
    ...defaultOptions,
    ...options,
  };

  if (typeof window !== "undefined") {
    // Client-side
    const cookieString = [
      `${name}=${value}`,
      `path=${cookieOptions.path}`,
      cookieOptions.domain && `domain=${cookieOptions.domain}`,
      cookieOptions.secure && "secure",
      cookieOptions.sameSite && `samesite=${cookieOptions.sameSite}`,
      cookieOptions.httpOnly && "httponly",
      cookieOptions.maxAge && `max-age=${cookieOptions.maxAge}`,
      cookieOptions.expires && `expires=${cookieOptions.expires.toUTCString()}`,
    ]
      .filter(Boolean)
      .join("; ");

    document.cookie = cookieString;
  } else {
    // Server-side
    cookies().set({
      name,
      value,
      ...cookieOptions,
    });
  }
};

export const getCookie = (name: string): string | undefined => {
  if (typeof window !== "undefined") {
    // Client-side
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : undefined;
  } else {
    // Server-side
    return cookies().get(name)?.value;
  }
};
