import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProtectedRoute({ allowedType, children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token || userType !== allowedType) {
      router.push("/");
    }
  }, []);

  return children;
}
