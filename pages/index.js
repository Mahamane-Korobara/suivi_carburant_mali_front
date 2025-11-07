import { useState } from "react";
import { useRouter } from "next/router";
import {
  Formulaire,
  Input,
  SubmitButton,
  Text,
  Link,
} from "@/components/FormStyles";
import AuthLayout from "@/components/AuthLayout";
import { API_BASE_URL } from "@/pages/api/url";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        userType === "admin"
          ? `${API_BASE_URL}/api/admin/login`
          : `${API_BASE_URL}/api/stations/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        
        // Stocker les infos selon le type d'utilisateur
        if (userType === "admin" && data.admin) {
          localStorage.setItem("user", JSON.stringify(data.admin));
          localStorage.setItem("userType", "admin");
        } else if (userType === "station" && data.station) {
          localStorage.setItem("user", JSON.stringify(data.station));
          localStorage.setItem("userType", "station");
        }

        // Redirection selon le rôle
        if (userType === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/station/dashboard");
        }
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Connectez-vous avec vos identifiants"
      footer={
        <>
          <Text>
            Vous n&apos;avez pas de compte ?{" "}
            <Link href="/inscription">S&apos;inscrire</Link>
          </Text>
        </>
      }
    >
      <Formulaire onSubmit={handleSubmit}>
        {error && (
          <div
            style={{
              color: "#dc3545",
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "6px",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Sélecteur de type d'utilisateur */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <button
            type="button"
            onClick={() => setUserType("admin")}
            style={{
              flex: 1,
              backgroundColor: userType === "admin" ? "#f7b32b" : "#6c757d",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: userType === "admin" ? "600" : "400",
              transition: "all 0.3s ease",
            }}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setUserType("station")}
            style={{
              flex: 1,
              backgroundColor: userType === "station" ? "#f7b32b" : "#6c757d",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: userType === "station" ? "600" : "400",
              transition: "all 0.3s ease",
            }}
          >
            Station
          </button>
        </div>

        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </SubmitButton>
      </Formulaire>
    </AuthLayout>
  );
}