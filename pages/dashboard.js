import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <ProtectedRoute allowedType="admin">
      <DashboardLayout />
    </ProtectedRoute>
  );
}
