import { SidebarProvider } from "@/components/ui";
import { SearchProvider } from "@/contexts/search-context";

import { DashboardNavbar } from "./_components/DashboardNavbar";
import { DashboardSidebar } from "./_components/Sidebar/DashboardSidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <div className="bg-background flex h-screen w-full overflow-hidden">
          <DashboardSidebar />
          <div className="relative flex flex-1 flex-col">
            <DashboardNavbar />
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto p-3 md:p-4">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
