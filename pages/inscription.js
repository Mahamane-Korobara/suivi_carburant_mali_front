import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Formulaire,
  FormGrid,
  GridInput,
  FullWidthInput,
  SubmitButton,
  Text,
  Link,
} from "@/components/Styles_pages/FormStyles";
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
    fuel_types: [], // Ajouté pour les types de carburant
  });
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  // Charger les types de carburant au montage
  useEffect(() => {
    loadFuelTypes();
    getGeolocation();
  }, []);

  // Récupérer les types de carburant depuis l'API
  const loadFuelTypes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/public/fuel-types`);
      if (response.ok) {
        const data = await response.json();
        setFuelTypes(data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des types de carburant:", err);
      // Valeurs par défaut si l'API échoue
      setFuelTypes([
        { id: 1, name: "Essence" },
        { id: 2, name: "Gazoil" },
        { id: 3, name: "Gaz" },
      ]);
    }
  };

  // Récupérer la géolocalisation automatiquement
  const getGeolocation = () => {
    setGeoLoading(true);
    setGeoError("");

    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n'est pas supportée par votre navigateur");
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        setGeoLoading(false);
      },
      (error) => {
        let errorMessage = "Erreur de géolocalisation";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Veuillez autoriser l'accès à votre position";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Position indisponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Délai dépassé";
            break;
        }
        setGeoError(errorMessage);
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer la sélection des types de carburant
  const handleFuelTypeChange = (fuelId) => {
    setSelectedFuels((prev) => {
      if (prev.includes(fuelId)) {
        return prev.filter((id) => id !== fuelId);
      } else {
        return [...prev, fuelId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation des types de carburant
    if (selectedFuels.length === 0) {
      setError("Veuillez sélectionner au moins un type de carburant");
      return;
    }

    // Validation de la géolocalisation
    if (!formData.latitude || !formData.longitude) {
      setError("La géolocalisation est requise. Veuillez autoriser l'accès à votre position.");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        fuel_types: selectedFuels,
      };

      const response = await fetch(`${API_BASE_URL}/api/public/stations/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inscription réussie ! Votre demande est en attente de validation par un administrateur.");
        router.push("/");
      } else {
        // Afficher les erreurs de validation
        if (data.errors) {
          const errorMessages = Object.entries(data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n");
          setError(errorMessages);
        } else {
          setError(data.message || "Erreur lors de l'inscription");
        }
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur de connexion au serveur. Vérifiez que votre API est lancée.");
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
              gridColumn: "1 / -1",
              whiteSpace: "pre-line",
            }}
          >
            {error}
          </div>
        )}

        {geoError && (
          <div
            style={{
              color: "#856404",
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "6px",
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{geoError}</span>
            <button
              type="button"
              onClick={getGeolocation}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Réessayer
            </button>
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

          {/* Coordonnées GPS en lecture seule */}
          <GridInput
            type="text"
            placeholder="Latitude (automatique)"
            name="latitude"
            value={
              geoLoading
                ? "Chargement..."
                : formData.latitude || "En attente de géolocalisation"
            }
            readOnly
            style={{
              backgroundColor: "#f8f9fa",
              cursor: "not-allowed",
              color: formData.latitude ? "#000" : "#6c757d",
            }}
            required
          />
          <GridInput
            type="text"
            placeholder="Longitude (automatique)"
            name="longitude"
            value={
              geoLoading
                ? "Chargement..."
                : formData.longitude || "En attente de géolocalisation"
            }
            readOnly
            style={{
              backgroundColor: "#f8f9fa",
              cursor: "not-allowed",
              color: formData.longitude ? "#000" : "#6c757d",
            }}
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

          {/* Sélection des types de carburant */}
          <div
            style={{
              gridColumn: "1 / -1",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Types de carburant disponibles * :
            </label>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {fuelTypes.map((fuel) => (
                <label
                  key={fuel.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    backgroundColor: selectedFuels.includes(fuel.id)
                      ? "#007bff"
                      : "white",
                    color: selectedFuels.includes(fuel.id) ? "white" : "#333",
                    borderRadius: "6px",
                    border: "2px solid",
                    borderColor: selectedFuels.includes(fuel.id)
                      ? "#007bff"
                      : "#dee2e6",
                    transition: "all 0.3s ease",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFuels.includes(fuel.id)}
                    onChange={() => handleFuelTypeChange(fuel.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{fuel.name}</span>
                </label>
              ))}
            </div>
          </div>
        </FormGrid>

        <SubmitButton
          type="submit"
          disabled={loading || geoLoading || !formData.latitude}
        >
          {loading
            ? "Inscription en cours..."
            : geoLoading
            ? "Attente de géolocalisation..."
            : "S'inscrire"}
        </SubmitButton>
      </Formulaire>
    </AuthLayout>
  );
}