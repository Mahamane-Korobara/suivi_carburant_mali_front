import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import stationService from '@/pages/api/stationService';
import FuelHistoryCard from '@/components/fuel/FuelHistoryCard';
import { PageContainer, Header, BackButton } from '@/components/Styles_pages/stationStyles/FuelStyles';
import { icons } from "@/components/utils/icons/Icons";
import StationPageHeader from '@/components/stationPageHeader';

const statusDisplayMapping = {
  disponible: 'Disponible',
  peu: 'Peu disponible',
  rupture: 'En rupture',
};

export default function FuelHistoryPage({ onNavigateToStatus }) {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (!token || userType !== "station") router.push("/");

    loadHistory();
  }, [router]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await stationService.getFuelHistory();

      const transformedHistory = response.data.map(item => {
        let statusIcon = 'success';
        if (item.status === 'rupture') statusIcon = 'error';
        else if (item.status === 'peu') statusIcon = 'warning';

        return {
          id: item.id,
          fuelType: item.fuel_type,
          oldStatus: item.old_status ? statusDisplayMapping[item.old_status] : 'Statut initial',
          newStatus: statusDisplayMapping[item.status] || item.status,
          date: item.created_at,
          statusIcon
        };
      });

      setHistory(transformedHistory);
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

  if (loading) return (
    <PageContainer>
      <BackButton onClick={onNavigateToStatus}>{icons.arrowLeft} Retour</BackButton>
      <Header>Chargement de l'historique...</Header>
    </PageContainer>
  );

  if (error) return (
    <PageContainer>
      <BackButton onClick={onNavigateToStatus}>{icons.arrowLeft} Retour</BackButton>
      <Header style={{color:"red"}}>Erreur : {error}</Header>
      <button onClick={loadHistory}>Réessayer</button>
    </PageContainer>
  );

  return (
    <PageContainer>
      <StationPageHeader welcomeText="Bienvenue sur KARBU" />
      <BackButton onClick={onNavigateToStatus}>{icons.arrowLeft} Retour</BackButton>
      <Header>Historique des changements de statut (7 derniers jours)</Header>

      {history.length === 0 ? (
        <div style={{textAlign:'center', padding:'2rem', color:'#94a3b8'}}>
          Aucun changement de statut cette semaine
        </div>
      ) : (
        history.map(item => (
          <FuelHistoryCard
            key={item.id}
            fuelType={item.fuelType}
            oldStatus={item.oldStatus}
            newStatus={item.newStatus}
            date={item.date}
            statusIcon={item.statusIcon}
          />
        ))
      )}
    </PageContainer>
  );
}
