import { getUser } from "@/lib/api";

import { Typography } from "../../../components/ui";

interface PageProps {
  params: Promise<{ username: string }>;
}

const page = async ({ params }: PageProps) => {
  const { username } = await params;
  const { data } = await getUser(username);

  if (!data) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Typography variant="h1">User Profile</Typography>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center justify-center gap-4">
          {key}: {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
};

export default page;
