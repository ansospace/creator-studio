"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/store";

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, accessToken, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Or any loading state you prefer
  }

  return (
    <div>
      {isAuthenticated ? "dashboard" : "not authenticated"}
      <br />
      accessToken: {accessToken}
      <br />
      isLoading: {isLoading.toString()}
    </div>
  );
};

export default DashboardPage;
