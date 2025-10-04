"use client";

import { Search } from "@/components/Search";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import ThemeToggle from "@/components/theme/ThemeToggle";

export const DashboardNavbar = () => {
  return (
    <Header>
      <TopNav links={topNav} />
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ThemeToggle />
        <ProfileDropdown />
      </div>
    </Header>
  );
};

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
