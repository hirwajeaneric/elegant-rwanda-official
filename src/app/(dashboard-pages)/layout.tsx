import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayoutContent from "./DashboardLayoutContent";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
      <Toaster />
    </AuthProvider>
  );
}
