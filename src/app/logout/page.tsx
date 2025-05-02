"use client";

import { RedirectType, redirect } from "next/navigation";
import { useEffect } from "react";

import { deleteCookie } from "@/lib/server";

export default function LogoutPage() {
  useEffect(() => {
    (async () => {
      await deleteCookie("authorization");
      await deleteCookie("refresh-token");
      redirect("/", RedirectType.replace);
    })();
  });
}
