"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { ENV_CONFIG } from "@/constants";
import { useToast } from "@/hooks";
import { Google } from "@/icons";

import { Button } from "./button";

export const SignInWithGoogle = () => {
  const router = useRouter();
  const { toast } = useToast();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

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
