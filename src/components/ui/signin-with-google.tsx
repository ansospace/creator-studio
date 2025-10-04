"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { toast } from "sonner";

import { ENV_CONFIG } from "@/constants";
import { Google } from "@/icons";

import { Button } from "./button";

export const SignInWithGoogle = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      toast.error("Failed to login");
    }
  }, [searchParams]);

  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() =>
        router.push(
          `${ENV_CONFIG.SERVICES.USER_API_URL}/api/v1/auth/google?redirectUrl=${ENV_CONFIG.APP.URL}/dashboard`
        )
      }
    >
      <Google />
      Sign in with Google
    </Button>
  );
};
