import { vitalData } from '@/lib/data';
import DashboardPageClient from '@/components/dashboard-page-client';

export default async function DashboardPage() {
  // In a real app, you would fetch data here, e.g., from a database.
  const data = vitalData;

  return <DashboardPageClient data={data} />;
}
