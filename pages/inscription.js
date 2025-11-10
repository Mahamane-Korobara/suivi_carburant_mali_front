import { useState } from "react";
import { useRouter } from "next/router";
import {
  Formulaire,
  FormGrid,
  GridInput,
  FullWidthInput,
  SubmitButton,
  Text,
  Link,
} from "@/components/Styles_pages/adminStyles/FormStyles";
import AuthLayout from "@/components/auth/AuthLayout";
import { API_BASE_URL } from "@/pages/api/config";

export default function Inscription() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    gerant_name: "",
    quartier: "",
    commune: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
    address: "",
  });
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
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token si l'API le retourne directement
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        
        // Rediriger vers la page de connexion ou dashboard
        router.push(data.token ? "/dashboard" : "/");
      } else {
        // Afficher les erreurs de validation
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          setError(errorMessages);
        } else {
          setError(data.message || "Erreur lors de l'inscription");
        }
      }
    } catch (err) {
      setError("Erreur de connexion au serveur. Vérifiez que votre API est lancée.");
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Inscrivez votre station pour une meilleure expérience"
      wide={true}
      footer={
        <>
          <Text>
            Vous avez déjà un compte ? <Link href="/">Se connecter</Link>
          </Text>
          <Text>
            Vous êtes usager ? Accédez directement à votre{" "}
            <Link href="/dashboard">espace</Link>
          </Text>
        </>
      }
    >
      <Formulaire onSubmit={handleSubmit}>
        {error && (
          <div style={{ 
            color: "red", 
            marginBottom: "1rem", 
            padding: "0.5rem",
            backgroundColor: "#fee",
            borderRadius: "4px",
            gridColumn: "1 / -1"
          }}>
            {error}
          </div>
        )}

        <FormGrid>
          <GridInput
            type="text"
            placeholder="Nom de la station"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <GridInput
            type="text"
            placeholder="Nom du gérant"
            name="gerant_name"
            value={formData.gerant_name}
            onChange={handleChange}
            required
          />

          <GridInput
            type="text"
            placeholder="Quartier"
            name="quartier"
            value={formData.quartier}
            onChange={handleChange}
            required
          />
          <GridInput
            type="text"
            placeholder="Commune"
            name="commune"
            value={formData.commune}
            onChange={handleChange}
            required
          />

          <GridInput
            type="tel"
            placeholder="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <GridInput
            type="email"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <GridInput
            type="number"
            step="0.000001"
            placeholder="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
          <GridInput
            type="number"
            step="0.000001"
            placeholder="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />

          <FullWidthInput
            type="text"
            placeholder="Adresse complète"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGrid>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </SubmitButton>
      </Formulaire>
    </AuthLayout>
  );
}