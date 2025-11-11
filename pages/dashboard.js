import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/adminLayout";

export default function Dashboard() {
  return (
    <ProtectedRoute allowedType="admin">
      <DashboardLayout />
    </ProtectedRoute>
  );
}
