"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getProfile } from "@/lib/services";
import { setLoading, setUser } from "@/redux/features/authSlice";

import NavBar from "../NavBar";

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
    enabled: !!accessToken,
    retry: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (data?.status === "failed") {
      redirect("/login");
    } else if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      {children}
    </div>
  );
};
