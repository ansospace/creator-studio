"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getProfile } from "@/lib/services";
import { setLoading, setUser } from "@/redux/features/authSlice";

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

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (data?.status === "failed") {
      redirect("/logout");
    } else if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  return <div className="flex min-h-screen flex-col">{children}</div>;
};
