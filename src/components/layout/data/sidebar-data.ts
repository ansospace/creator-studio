import {
  AudioWaveform,
  Check,
  Command,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  PackagePlus,
  Settings,
  Settings2,
  User2,
  Users,
} from "lucide-react";

import type { NavChildItem, SidebarData } from "@/types/types";

export const profileSidebarItems: NavChildItem[] = [
  {
    title: "Profile",
    icon: User2,
    url: "/dashboard/settings",
  },
  {
    title: "Account",
    icon: Settings2,
    url: "/dashboard/settings/account",
  },
];

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: Check,
        },
        {
          title: "Apps",
          url: "/apps",
          icon: PackagePlus,
        },
        {
          title: "Chats",
          url: "/chats",
          badge: "3",
          icon: MessageCircle,
        },
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: profileSidebarItems,
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
