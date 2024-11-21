import type { Metadata } from "next";
import localFont from "next/font/local";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/components/theme";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <ReduxProvider>
            <ReactQueryProvider>
              <BootUpProvider>{children}</BootUpProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </ReduxProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
