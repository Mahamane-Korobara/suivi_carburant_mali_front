import ProtectedRoute from "@/components/auth/ProtectedRoute";
import StationFuelLayout from "@/components/stationLayout";

export default function Station() {
  return (
    <ProtectedRoute allowedType="station">
      <StationFuelLayout />
    </ProtectedRoute>
  );
}