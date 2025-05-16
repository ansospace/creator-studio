"use client";

import { redirect } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getProfile } from "@/lib/services";
import { setUser } from "@/redux/features/authSlice";

import { Loader } from "../global";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (data?.status === "failed") {
    redirect("/login");
  } else if (data?.data) {
    dispatch(setUser(data.data));
  }

  return (
    <div className="flex min-h-screen">
      <Loader loading={isLoading}>{children}</Loader>
    </div>
  );
};
