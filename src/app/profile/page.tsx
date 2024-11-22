import { Typography } from "@/components/ui";
import { getAccessToken } from "@/lib/server";

const ProfilePage = async () => {
  const token = await getAccessToken();

  return (
    <div className="container mx-auto p-6">
      <Typography variant="h2" className="mb-6">
        Profile Settings
      </Typography>
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">{token}</div>
    </div>
  );
};

export default ProfilePage;
