"use client";

import { useRouter } from "next/navigation";

import { Google } from "@/icons";

import { envConstants } from "../../lib/constants/env.constant";

export const SignInWithGoogle = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      onClick={() =>
        router.push(
          `${envConstants.NEXT_PUBLIC_USER_SERVICE_BASE_URL}/api/v1/auth/google?redirectUrl=${envConstants.NEXT_PUBLIC_APP_URL}/dashboard`
        )
      }
    >
      <Google />
      Sign in with Google
    </button>
  );
};
