import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { DashboardSidebar } from "./_components/Sidebar/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
