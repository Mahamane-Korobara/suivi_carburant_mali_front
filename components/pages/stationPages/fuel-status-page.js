import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import stationService from '@/pages/api/stationService';
import FuelStatusCard from '@/components/fuel/FuelStatusCard';
import FuelActionsButtons from '@/components/fuel/FuelActionsButtons';
import { PageContainer, Header } from '@/components/Styles_pages/stationStyles/FuelStyles';

// Mapping des statuts Laravel → affichage
const statusMapping = {
  disponible: 'Disponible',
  peu: 'Peu',
  rupture: 'Rupture',
};

const reverseStatusMapping = {
  'Disponible': 'disponible',
  'Peu': 'peu',
  'Rupture': 'rupture',
};

export default function FuelStatusPage({ onNavigateToHistory }) {
  const router = useRouter();
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (!token || userType !== "station") router.push("/");

    loadFuelStatuses();
  }, [router]);

  const loadFuelStatuses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await stationService.getFuelStatuses();
      const transformedFuels = response.data.map(fuel => ({
        id: fuel.id,
        type: fuel.type,
        status: fuel.status ? statusMapping[fuel.status] : 'Non défini',
        statusRaw: fuel.status ?? null,
        updatedAt: fuel.updated_at
      }));

      setFuels(transformedFuels);
    } catch (err) {
      console.error(err);
      setError(err.message);
      if (err.message.includes("401")) {
        localStorage.clear();
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (fuelType, newStatus) => {
    try {
      const fuel = fuels.find(f => f.type === fuelType);
      if (!fuel) return alert("Carburant introuvable");

      const statusForApi = reverseStatusMapping[newStatus];
      console.log(`🔄 ${fuelType} → ${statusForApi}`);

      // ✅ Appel API : update et historique gérés côté backend
      await stationService.updateFuelStatus(fuel.id, statusForApi);

      await loadFuelStatuses(); // Recharger l'état actuel
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  if (loading) return <PageContainer><Header>Chargement des données...</Header></PageContainer>;
  if (error) return (
    <PageContainer>
      <Header style={{color:"red"}}>Erreur : {error}</Header>
      <button onClick={loadFuelStatuses}>Réessayer</button>
    </PageContainer>
  );

  return (
    <PageContainer>
      <Header>Sélectionnez un statut pour mettre à jour la disponibilité</Header>
      {fuels.map(fuel => (
        <FuelStatusCard
          key={fuel.id}
          fuelType={fuel.type}
          initialStatus={fuel.status}
          onStatusChange={handleStatusChange}
        />
      ))}
      <FuelActionsButtons
        onAddClick={() => alert("Ajout futur")}
        onHistoryClick={onNavigateToHistory}
      />
    </PageContainer>
  );
}
