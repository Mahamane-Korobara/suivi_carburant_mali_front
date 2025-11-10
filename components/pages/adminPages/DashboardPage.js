import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import adminService from "@/pages/api/adminService";
import useAdminAuth from "@/hooks/useAdminAuth";

import {
  StatCard,
  StatTitle,
  StatValue,
  StatBadge,
  CommunesList,
  CommuneItem,
  CommuneName,
  CommuneCount
} from "@/components/Styles_pages/adminStyles/DashboardStyles";
import {
  BigContainer,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  BtnError
} from "@/components/Styles_pages/StyleCommun";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [fuelStats, setFuelStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger les stats en parallèle
      const [statsData, fuelData] = await Promise.all([
        adminService.getStats(),
        adminService.getFuelStats(),
      ]);

      setStats(statsData);
      setFuelStats(fuelData);
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      setError(err.message);
      
      // Si erreur 401 (non autorisé), rediriger vers login
      if (err.message.includes("401") || err.message.includes("Unauthorized")) {
        localStorage.clear();
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };
  
  useAdminAuth(loadDashboardData);
  // Affichage pendant le chargement
  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Chargement des données...</p>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <p>Erreur : {error}</p>
        <BtnError
          onClick={loadDashboardData}
        >
          Réessayer
        </BtnError>
      </div>
    );
  }

  // Affichage des données
  return (
    <>
      <WelcomeSection>
        <WelcomeTitle>Bienvenue sur KARBU</WelcomeTitle>
        <WelcomeSubtitle>
          Votre meilleure expérience de gestion de carburant commence ici
        </WelcomeSubtitle>
      </WelcomeSection>

      {/* Stats Stations */}
      <SectionTitle>Stations</SectionTitle>
      <BigContainer>
        <StatCard>
          <StatTitle>Stations approuvées</StatTitle>
          <StatValue>{stats?.approved || 0}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Stations en attente</StatTitle>
          <StatValue>{stats?.pending || 0}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Stations rejetées</StatTitle>
          <StatValue>{stats?.rejected || 0}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Taux d'approbation</StatTitle>
          <StatValue>{stats?.approval_rate || 0}%</StatValue>
        </StatCard>
      </BigContainer>

      {/* Stats Interactions */}
      <SectionTitle>Interactions</SectionTitle>
      <BigContainer>
        <StatCard>
          <StatTitle>Totales interactions usagers</StatTitle>
          <StatValue>{stats?.total_visits || 0}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Visites aujourd'hui</StatTitle>
          <StatValue>{stats?.visits_today || 0}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Visites cette semaine</StatTitle>
          <StatValue>{stats?.visits_this_week || 0}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Nouvelles stations (30j)</StatTitle>
          <StatValue>{stats?.new_this_month || 0}</StatValue>
        </StatCard>
      </BigContainer>

      {/* Stats Carburant */}
      <SectionTitle>Disponibilité Carburant</SectionTitle>
      <BigContainer>
        <StatCard>
          <StatTitle>Points disponibles</StatTitle>
          <StatValue>{fuelStats?.available || 0}</StatValue>
          <StatBadge positive>Disponible</StatBadge>
        </StatCard>

        <StatCard>
          <StatTitle>En rupture</StatTitle>
          <StatValue>{fuelStats?.out_of_stock || 0}</StatValue>
          <StatBadge negative>Rupture</StatBadge>
        </StatCard>

        <StatCard>
          <StatTitle>Stock limité</StatTitle>
          <StatValue>{fuelStats?.limited || 0}</StatValue>
          <StatBadge warning>Limité</StatBadge>
        </StatCard>

        <StatCard>
          <StatTitle>Total points carburant</StatTitle>
          <StatValue>{fuelStats?.total_fuel_points || 0}</StatValue>
        </StatCard>
      </BigContainer>

      {/* Top Communes */}
      <SectionTitle>Top 5 Communes</SectionTitle>
      <CommunesList>
        {stats?.top_communes?.map((commune, index) => (
          <CommuneItem key={index}>
            <CommuneName>{commune.commune}</CommuneName>
            <CommuneCount>{commune.total} stations</CommuneCount>
          </CommuneItem>
        ))}
      </CommunesList>
    </>
  );
}