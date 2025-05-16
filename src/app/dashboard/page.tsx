import { SidebarProvider } from "@/components/ui/sidebar";

import { AuthProvider } from "../../components/auth/AuthProvider";
import DashboardPage from "./Dashboard";
import { DashboardNavbar } from "./_components/DashboardNavbar";
import { DashboardSidebar } from "./_components/Sidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="bg-background flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <div className="relative flex flex-1 flex-col">
          <DashboardNavbar />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-3 md:p-4">
              <DashboardPage />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const page = () => {
  return (
    <AuthProvider>
      <DashboardLayout />
    </AuthProvider>
  );
};

export default page;
