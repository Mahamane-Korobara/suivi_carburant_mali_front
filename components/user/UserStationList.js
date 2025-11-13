import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import usagerService from '@/pages/api/usagerService';
import { getUserLocation, calculateDistance, formatDistance, saveUserLocation, getSavedUserLocation } from '@/components/utils/geolocalisationUsagerStation/geolocalisation';
import SearchBarComponent from '@/components/user/SearchBar';
import FilterBarComponent from '@/components/user/FilterBar';
import StationCardComponent from '@/components/user/StationCard';
import { UserContainer } from '@/components/Styles_pages/userStyles/UserStyles';
import PublicPageHeader from '@/components/usagerPageHeader';

export default function UserStationList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  
  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 stations par page pour mobile

  // Charger la position de l'utilisateur au montage
  useEffect(() => {
    loadUserLocation();
  }, []);

  // Charger les stations quand les filtres changent
  useEffect(() => {
    loadStations();
    setCurrentPage(1); // Reset à la page 1 lors du filtrage
  }, [searchQuery, activeFilter]);

  const loadUserLocation = async () => {
    const savedLocation = getSavedUserLocation();
    if (savedLocation) {
      setUserLocation(savedLocation);
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    try {
      const location = await getUserLocation();
      setUserLocation(location);
      saveUserLocation(location.latitude, location.longitude);
    } catch (err) {
      console.error("Erreur géolocalisation:", err);
      setGeoError(err.message);
    } finally {
      setGeoLoading(false);
    }
  };

  const loadStations = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {};
      
      if (searchQuery) {
        filters.search = searchQuery;
      }

      if (activeFilter !== 'all') {
        filters.status = activeFilter;
      }

      const data = await usagerService.getStations(filters);

      const transformedStations = data.map((station) => {
        let distance = "N/A";
        let distanceInKm = Infinity;

        if (userLocation && station.latitude && station.longitude) {
          distanceInKm = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            station.latitude,
            station.longitude
          );
          distance = formatDistance(distanceInKm);
        }

        return {
          id: station.id,
          name: station.name,
          address: `${station.quartier}, ${station.commune}`,
          distance: distance,
          distanceInKm: distanceInKm,
          latitude: station.latitude,
          longitude: station.longitude,
          visits_count: station.visits_count,
          fuelTypes: station.fuel_statuses.map((fuel) => ({
            type: fuel.fuel_type,
            status: fuel.status,
            color: fuel.color,
          })),
        };
      });

      transformedStations.sort((a, b) => a.distanceInKm - b.distanceInKm);
      setStations(transformedStations);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation && stations.length > 0) {
      loadStations();
    }
  }, [userLocation]);

  // Filtrage local
  const filteredStations = stations.filter(station => {
    if (activeFilter === 'all') return true;
    return station.fuelTypes.some(fuel => fuel.status === activeFilter);
  });

  // Pagination
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStations = filteredStations.slice(startIndex, endIndex);

  const handleReport = (stationId) => {
    router.push(`/report/${stationId}`);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <UserContainer>
        <PublicPageHeader centerText="Stations" />
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          Chargement des stations...
        </div>
      </UserContainer>
    );
  }

  return (
    <UserContainer>
      <PublicPageHeader centerText="Stations" />

      {geoLoading && (
        <div style={{
          padding: '0.75rem',
          margin: '1rem',
          backgroundColor: '#e7f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '6px',
          color: '#004085',
          textAlign: 'center',
        }}> Récupération de votre position...
        </div>
      )}

      {geoError && (
        <div style={{
          padding: '0.75rem',
          margin: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px',
          color: '#856404',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'center',
        }}>
          <span style={{ textAlign: 'center' }}>{geoError}</span>
          <button
            onClick={loadUserLocation}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Réessayer
          </button>
        </div>
      )}

      {userLocation && (
        <div style={{
          padding: '0.75rem',
          margin: '1rem',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '6px',
          color: '#155724',
          textAlign: 'center',
          fontSize: '0.9rem',
        }}>
          ✓ Position détectée - Stations triées par distance
        </div>
      )}

      <SearchBarComponent value={searchQuery} onChange={setSearchQuery} />
      <FilterBarComponent activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Compteur de résultats */}
      {filteredStations.length > 0 && (
        <div style={{
          padding: '0.5rem 1rem',
          margin: '0.5rem 1rem',
          color: '#64748b',
          fontSize: '0.9rem',
          textAlign: 'center',
        }}>
          {filteredStations.length} station{filteredStations.length > 1 ? 's' : ''} trouvée{filteredStations.length > 1 ? 's' : ''}
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          Erreur : {error}
          <button
            onClick={loadStations}
            style={{
              margin: '1rem auto',
              display: 'block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
        </div>
      )}

      {currentStations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          Aucune station trouvée
        </div>
      ) : (
        <>
          {currentStations.map(station => (
            <StationCardComponent
              key={station.id}
              station={station}
              onReport={() => handleReport(station.id)}
            />
          ))}

          {/* Pagination mobile-friendly */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.5rem 1rem',
              alignItems: 'center',
            }}>
              {/* Info page */}
              <div style={{
                color: '#64748b',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                Page {currentPage} sur {totalPages}
              </div>

              {/* Boutons de navigation */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                width: '100%',
              }}>
                {/* Bouton Précédent */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: currentPage === 1 ? '#e2e8f0' : '#007bff',
                    color: currentPage === 1 ? '#94a3b8' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    minWidth: '120px',
                  }}
                >
                  ← Précédent
                </button>

                {/* Numéros de page (seulement 3 pages visibles sur mobile) */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                }}>
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage === 1) {
                      pageNum = i + 1;
                    } else if (currentPage === totalPages) {
                      pageNum = totalPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        style={{
                          padding: '0.75rem',
                          minWidth: '45px',
                          backgroundColor: currentPage === pageNum ? '#007bff' : 'white',
                          color: currentPage === pageNum ? 'white' : '#475569',
                          border: '2px solid',
                          borderColor: currentPage === pageNum ? '#007bff' : '#cbd5e1',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: currentPage === pageNum ? '600' : '400',
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Bouton Suivant */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#007bff',
                    color: currentPage === totalPages ? '#94a3b8' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    minWidth: '120px',
                  }}
                >
                  Suivant →
                </button>
              </div>

              {/* Indicateur visuel de progression */}
              <div style={{
                width: '100%',
                maxWidth: '300px',
                height: '4px',
                backgroundColor: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(currentPage / totalPages) * 100}%`,
                  height: '100%',
                  backgroundColor: '#007bff',
                  transition: 'width 0.3s ease',
                }}></div>
              </div>
            </div>
          )}
        </>
      )}
    </UserContainer>
  );
}