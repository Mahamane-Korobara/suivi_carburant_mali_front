import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAdminAuth(callback) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token || userType !== "admin") {
      router.push("/");
      return;
    }

    if (callback) callback(); // Exécuter la fonction de chargement si fournie
  }, [router]);
}
