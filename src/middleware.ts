import { NextRequest, NextResponse } from "next/server";

import { isLoggedIn } from "./actions/auth";

export const middleware = async (request: NextRequest) => {
  const path = new URL(request.url).pathname;

  if (request.headers.get("accept")?.includes("text/html")) {
    const hasTokens = await isLoggedIn();

    const protectedRoutes = ["/dashboard", "/profile", "/logout", "/settings"];
    const authRoutes = ["/login", "/sign-up"];

    // Use some() to check if any protected route starts with the current path
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isAuthRoute = authRoutes.includes(path);

    if (isProtectedRoute && !hasTokens) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (isAuthRoute && hasTokens) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};
