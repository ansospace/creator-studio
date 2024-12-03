"use server";

import { redirect } from "next/navigation";

import { deleteCookie } from "@/lib/server";

export default async function LogoutPage() {
  await deleteCookie("authorization");
  await deleteCookie("refresh-token");
  redirect("/");
}
