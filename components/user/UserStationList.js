import React, { useState, useEffect } from 'react';
import SearchBarComponent from '@/components/user/SearchBar';
import FilterBarComponent from '@/components/user/FilterBar';
import StationCardComponent from '@/components/user/StationCard';
import { UserContainer } from '@/components/Styles_pages/userStyles/UserStyles';
import PublicPageHeader from '@/components/usagerPageHeader';


// Données simulées (à remplacer par API plus tard)
const mockStations = [
  {
    id: 1,
    name: "Station Total Energie - Victor Hugo",
    address: "Avenue Victor Hugo, Paris",
    distance: "1.2",
    fuelTypes: [
      { type: "Essence", status: "disponible" },
      { type: "Gazoil", status: "peu" },
      { type: "Gaz", status: "rupture" }
    ]
  },
  {
    id: 2,
    name: "Station Shell - République",
    address: "Place de la République, Paris",
    distance: "2.5",
    fuelTypes: [
      { type: "Essence", status: "disponible" },
      { type: "Gazoil", status: "disponible" }
    ]
  },
  {
    id: 3,
    name: "Station Esso - Gare de Lyon",
    address: "Rue de Bercy, Paris",
    distance: "3.1",
    fuelTypes: [
      { type: "Gazoil", status: "rupture" },
      { type: "Gaz", status: "peu" }
    ]
  },
];

export default function UserStationList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [stations, setStations] = useState(mockStations);

  // Filtrage
const filteredStations = stations.filter(station => {
  // Recherche texte
  const matchesSearch =
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.toLowerCase().includes(searchQuery.toLowerCase());

  if (!matchesSearch) return false;

  // Filtre "Tout" → tout montrer
  if (activeFilter === 'all') return true;

  // Filtrer par statut du carburant
  return station.fuelTypes.some(fuel => fuel.status === activeFilter);
});


  const handleReport = (stationId) => {
    alert(`Station ${stationId} signalée`);
  };


  return (
    <UserContainer>
      <PublicPageHeader centerText="Stations" />
      <SearchBarComponent value={searchQuery} onChange={setSearchQuery} />
      <FilterBarComponent activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {filteredStations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          Aucune station trouvée
        </div>
      ) : (
        filteredStations.map(station => (
          <StationCardComponent
            key={station.id}
            station={station}
            onReport={() => handleReport(station.id)}
          />
        ))
      )}
    </UserContainer>
  );
}