import { AuthProvider } from "@/components/auth-provider";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  );
}
