import React from 'react';
import FuelStatusCard from '@/components/fuel/FuelStatusCard';
import FuelActionsButtons from '@/components/fuel/FuelActionsButtons';

export default function FuelStatusPage() {
  // Données simulées
  const fuels = [
    { id: 1, type: 'Essence', status: 'Disponible' },
    { id: 2, type: 'Gazoil', status: 'Peu' },
    { id: 3, type: 'Gaz', status: 'Rupture' },
  ];

  const handleStatusChange = (fuelType, newStatus) => {
    console.log(`Statut mis à jour : ${fuelType} → ${newStatus}`);
    // Ici, tu peux appeler adminService.updateFuelStatus(...)
  };

  const handleHistoryClick = () => {
    alert("Accès à l'historique...");
  };

  const handleAddClick = () => {
    alert("Ajout d'un nouveau type de carburant...");
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#23272f', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', fontSize: '1.2rem' }}>
        Sélectionnez un statut pour mettre à jour la disponibilité
      </h1>

      {fuels.map((fuel) => (
        <FuelStatusCard
          key={fuel.id}
          fuelType={fuel.type}
          initialStatus={fuel.status}
          onStatusChange={handleStatusChange}
        />
      ))}

      <FuelActionsButtons
        onHistoryClick={handleHistoryClick}
        onAddClick={handleAddClick}
      />
    </div>
  );
}