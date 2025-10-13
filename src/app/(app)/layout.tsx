import { SidebarProvider } from "@/components/ui/sidebar-new";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (<SidebarProvider><DashboardLayout>{children}</DashboardLayout></SidebarProvider>);
}
