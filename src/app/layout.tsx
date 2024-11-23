import type { Metadata } from "next";
import localFont from "next/font/local";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/components/theme";

import NavBar from "../components/NavBar";
import { Toaster } from "../components/ui/toaster";
import { ReactQueryProvider } from "../react-query/provider";
import { ReduxProvider } from "../redux/provider";
import BootUpProvider from "./BootUpProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ansopedia",
  description: "Easy way to learn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <ReactQueryProvider>
              <BootUpProvider>
                <NavBar />
                {children}
              </BootUpProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </ReduxProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
