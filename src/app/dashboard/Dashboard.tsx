"use client";

import { useAppSelector } from "@/redux/store";

const DashboardPage = () => {
  const { isAuthenticated, accessToken, isLoading } = useAppSelector((state) => state.auth);
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
