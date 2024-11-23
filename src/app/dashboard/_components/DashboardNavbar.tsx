"use client";

import { Bell, Search } from "lucide-react";

import ThemeToggle from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export const DashboardNavbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <SidebarTrigger />

        <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={toggleSidebar}>
          <Search className="h-4 w-4" />
        </Button>

        <div className="flex flex-1 items-center gap-4">
          <form className="hidden flex-1 md:block">
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="search" placeholder="Search..." className="h-8 w-full lg:w-[300px]" />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeToggle className="h-8 w-8" />
        </div>
      </div>
    </header>
  );
};
