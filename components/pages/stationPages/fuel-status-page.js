import React from 'react';
import FuelStatusCard from '@/components/fuel/FuelStatusCard';
import FuelActionsButtons from '@/components/fuel/FuelActionsButtons';
import { PageContainer, Header } from '@/components/Styles_pages/stationStyles/FuelStyles';

export default function FuelStatusPage({ onNavigateToHistory }) {
  // Données simulées
  const fuels = [
    { id: 1, type: 'Essence', status: 'Disponible' },
    { id: 2, type: 'Gazoil', status: 'Peu' },
    { id: 3, type: 'Gaz', status: 'Rupture' },
  ];

  const handleStatusChange = (fuelType, newStatus) => {
    console.log(`Statut mis à jour : ${fuelType} → ${newStatus}`);
  };

  const handleAddClick = () => {
    alert("Ajout d'un nouveau type de carburant...");
  };

  return (
    <PageContainer>
      <Header>
        Sélectionnez un statut pour mettre à jour la disponibilité
      </Header>

      {fuels.map((fuel) => (
        <FuelStatusCard
          key={fuel.id}
          fuelType={fuel.type}
          initialStatus={fuel.status}
          onStatusChange={handleStatusChange}
        />
      ))}

      <FuelActionsButtons
        onAddClick={handleAddClick}
        onHistoryClick={onNavigateToHistory}
      />
    </PageContainer>
  );
}