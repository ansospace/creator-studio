// import {
//   IconBarrierBlock,
//   IconBrowserCheck,
//   IconBug,
//   IconChecklist,
//   IconError404,
//   IconHelp,
//   IconLayoutDashboard,
//   IconLock,
//   IconLockAccess,
//   IconMessages,
//   IconNotification,
//   IconPackages,
//   IconPalette,
//   IconServerOff,
//   IconSettings,
//   IconTool,
//   IconUserCog,
//   IconUserOff,
//   IconUsers,
// } from "@tabler/icons-react";
// import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
// import { ClerkLogo } from "@/assets/clerk-logo";
import {
  AudioWaveform,
  Bell,
  Calendar,
  Check,
  Command,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  PackagePlus,
  PanelLeft,
  Settings,
  Settings2,
  User2,
  Users,
} from "lucide-react";

import { SidebarData } from "../../../types/types";

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
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: User2,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: Settings2,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: PanelLeft,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: Bell,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: Calendar,
            },
          ],
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
