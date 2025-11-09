import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <ProtectedRoute allowedType="admin">
      <DashboardLayout />
    </ProtectedRoute>
  );
}
