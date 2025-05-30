"use client";

import { redirect } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getProfile } from "@/lib/services";
import { setUser } from "@/redux/features/authSlice";

import { Loader } from "../global";

interface AuthProviderProps {
  children: React.ReactNode;
  accessToken?: string;
  userId?: string;
}

export const AuthProvider = ({ children, accessToken, userId }: AuthProviderProps) => {
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: getProfile,
    enabled: !!accessToken && !!userId,
    retry: false,
  });

  if (data?.status === "failed") {
    redirect("/login");
  } else if (data?.data) {
    dispatch(setUser(data.data));
  }

  return <Loader loading={isLoading}>{children}</Loader>;
};
