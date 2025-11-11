import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FuelStatusPage from "@/components/pages/stationPages/fuel-status-page";

export default function Station() {
  return (
    <ProtectedRoute allowedType="station">
      <FuelStatusPage />
    </ProtectedRoute>
  );
}