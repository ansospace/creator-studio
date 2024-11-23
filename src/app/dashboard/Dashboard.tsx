"use client";

import { useEffect, useState } from "react";

import { ConnectedUsers } from "@/components/ConnectedUsers";
import { useAppSelector } from "@/redux/store";

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, accessToken, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="grid gap-4">
        <div>
          {isAuthenticated ? "dashboard" : "not authenticated"}
          <br />
          accessToken: {accessToken}
          <br />
          isLoading: {isLoading.toString()}
        </div>

        <div className="rounded-lg border p-4">
          <ConnectedUsers />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
