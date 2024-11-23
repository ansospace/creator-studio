"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { setUser } from "@/redux/features/authSlice";

import { Profile } from "../../types/profile";

interface AuthProviderProps {
  children: React.ReactNode;
  profile: Profile;
}

export const AuthProvider = ({ children, profile }: AuthProviderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      dispatch(setUser(profile));
    }
  }, [dispatch, profile]);

  return <>{children}</>;
};
