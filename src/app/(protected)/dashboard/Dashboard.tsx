"use client";

import { useEffect, useState } from "react";

import { Activity, ArrowUp, HelpCircle, Users } from "lucide-react";

import { ConnectedUsers } from "@/components/ConnectedUsers";
import { Typography } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/store";

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Total Users</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">1,234</div>
              <Typography variant="smallText" className="flex items-center text-green-500">
                <ArrowUp className="h-3 w-3" />
                20.1%
              </Typography>
            </div>
            <Typography variant="mutedText">from last month</Typography>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">423</div>
              <Typography variant="smallText" className="flex items-center text-green-500">
                <ArrowUp className="h-3 w-3" />
                12.3%
              </Typography>
            </div>
            <Typography variant="mutedText">from last hour</Typography>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Total Questions</CardTitle>
            <HelpCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">5,678</div>
              <Typography variant="smallText" className="flex items-center text-green-500">
                <ArrowUp className="h-3 w-3" />
                8.2%
              </Typography>
            </div>
            <Typography variant="mutedText">from last week</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Connected Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectedUsers />
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Typography variant="mutedText">Authentication:</Typography>
                <Typography
                  variant="span"
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    isAuthenticated
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="mutedText">System Status:</Typography>
                <Typography
                  variant="span"
                  className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {isLoading ? "Loading" : "Online"}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
