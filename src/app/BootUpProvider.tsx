"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getAccessToken } from "../lib/server";
import { setCredentials } from "../redux/features/authSlice";

const BootUpProvider = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();

      if (accessToken) {
        dispatch(setCredentials({ accessToken }));
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
};

export default BootUpProvider;
