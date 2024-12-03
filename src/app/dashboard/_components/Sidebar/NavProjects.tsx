import Link from "next/link";

import { User2 } from "lucide-react";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import { getUsers } from "@/lib/api";

export const NavProjects = async () => {
  const projects = await getUsers();

  return (
    <SidebarMenu>
      {projects.data?.users.map((user) => (
        <SidebarMenuItem key={user.username}>
          <SidebarMenuButton asChild>
            <Link href={`/users/${user.username}`}>
              <User2 />
              <span>{user.username}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
