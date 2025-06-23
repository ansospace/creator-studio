"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { COOKIES } from "@/constants";
import { deleteCookie } from "@/lib/server";
import { logout } from "@/redux/features/authSlice";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await deleteCookie(COOKIES.AUTHORIZATION);
      await deleteCookie(COOKIES.REFRESH_TOKEN);
      await deleteCookie(COOKIES.USER_ID);
      router.replace("/");
      dispatch(logout());
    })();
  }, [dispatch, router]);
}
