import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { GET_USERS } from "@/lib/api";
import { GetUser } from "@/types/user";

const UserList = ({ users }: { users: GetUser[] }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.userId} className="flex items-center gap-2">
          <Link href={`/users/${user.username}`}>
            <Avatar>
              <AvatarImage src={user.username} alt={user.username} />
              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.username}
            <span className="ml-2 text-sm text-gray-500">{user.email}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

const page = async () => {
  const response = await GET_USERS();
  if (!response.data) {
    return <div>No users found</div>;
  }

  return <UserList users={response.data.users} />;
};

export default page;
