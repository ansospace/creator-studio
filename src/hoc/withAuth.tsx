import { redirect } from "next/navigation";

import { AuthProvider } from "@/components/auth/AuthProvider";

import { getProfile } from "../lib/api";
import { getAccessToken } from "../lib/server";
import { Profile } from "../types/profile";

// Server-side authentication check
const withAuth = async ({ children }: { children: React.ReactNode }) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    redirect("/login");
  }

  const profile = await getProfile();
  if (profile.status === "failed") {
    redirect("/login");
  }

  return <AuthProvider profile={profile.data as Profile}>{children}</AuthProvider>;
};

export default withAuth;
