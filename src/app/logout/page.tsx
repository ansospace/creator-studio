"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { deleteCookie } from "@/lib/server";
import { logout } from "@/redux/features/authSlice";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await deleteCookie("authorization");
      await deleteCookie("refresh-token");
      router.replace("/");
      dispatch(logout());
    })();
  }, [dispatch, router]);
}
