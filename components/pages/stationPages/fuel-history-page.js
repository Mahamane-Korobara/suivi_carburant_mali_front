import React from 'react';
import FuelHistoryCard from '@/components/fuel/FuelHistoryCard';
import { PageContainer, Header, BackButton } from '@/components/Styles_pages/stationStyles/FuelStyles';
import { icons } from "@/components/utils/icons/Icons";
export default function FuelHistoryPage({ onNavigateToStatus }) {
  // Données simulées - remplace par un appel API
  const historyData = [
    {
      id: 1,
      fuelType: 'Gazole B7',
      oldStatus: 'Disponible',
      newStatus: 'Indisponible',
      date: '24/05/2024 à 14:32',
      statusIcon: 'warning',
    },
    {
      id: 2,
      fuelType: 'Sans Plomb 98',
      oldStatus: 'Indisponible',
      newStatus: 'Disponible',
      date: '24/05/2024 à 11:15',
      statusIcon: 'success',
    },
    {
      id: 3,
      fuelType: 'SP95-E10',
      oldStatus: 'Disponible',
      newStatus: 'Indisponible',
      date: '23/05/2024 à 18:45',
      statusIcon: 'warning',
    },
    {
      id: 4,
      fuelType: 'Gazole B7',
      oldStatus: 'Indisponible',
      newStatus: 'Disponible',
      date: '23/05/2024 à 09:02',
      statusIcon: 'success',
    },
  ];

  return (
    <PageContainer>
      <BackButton onClick={onNavigateToStatus}>
        {icons.arrowLeft} Retour aux statuts
      </BackButton>

      <Header>Historique des changements de statut</Header>

      {historyData.map((item) => (
        <FuelHistoryCard
          key={item.id}
          fuelType={item.fuelType}
          oldStatus={item.oldStatus}
          newStatus={item.newStatus}
          date={item.date}
          statusIcon={item.statusIcon}
        />
      ))}
    </PageContainer>
  );
}