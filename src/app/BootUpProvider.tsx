"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getAccessToken } from "../lib/server";
import { setCredentials, setLoading } from "../redux/features/authSlice";

const BootUpProvider = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          dispatch(setCredentials({ accessToken }));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Auth initialization failed:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default BootUpProvider;
