import { Suspense } from "react";

import { UpdateProfileForm } from "@/components/forms";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { Card, CardContent, CardHeader, Typography } from "@/components/ui";
import { getProfile } from "@/lib/services";

export const dynamic = "force-dynamic";

// Loading component
const ProfileLoading = () => (
  <div className="container mx-auto p-6">
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded bg-gray-200" />
      <div className="h-4 w-96 rounded bg-gray-200" />
      <Card>
        <CardHeader>
          <div className="h-6 w-32 rounded bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ProfileContent = async () => {
  try {
    const res = await getProfile();

    if (res.status === "failed") {
      return <div className="container mx-auto p-6">Please login to view profile</div>;
    }

    return (
      <div className="container mx-auto space-y-8 p-6">
        <div>
          <Typography variant="h2" className="tracking-tight">
            Profile Settings
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            Manage your profile information and preferences.
          </Typography>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProfileInfo profile={res.data} />
          <Card>
            <CardContent className="p-6">
              <UpdateProfileForm profile={res.data} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-6">
        <Typography variant="h2" className="text-red-500">
          Error loading profile
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          {error instanceof Error ? error.message : "An unexpected error occurred"}
        </Typography>
      </div>
    );
  }
};

const ProfilePage = () => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
