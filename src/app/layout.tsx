import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "../components/auth/AuthProvider";
import { COOKIES } from "../constants";
import { getCookie } from "../lib/server";
import { ReactQueryProvider } from "../react-query/provider";
import { ReduxProvider } from "../redux/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ansopedia",
  description: "Easy way to learn",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accessToken = await getCookie(COOKIES.AUTHORIZATION);
  const userId = await getCookie(COOKIES.USER_ID);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <ReactQueryProvider>
              <AuthProvider accessToken={accessToken} userId={userId}>
                {children}
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </ReduxProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
