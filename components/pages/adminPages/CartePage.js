import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  BigContainerUneSection
} from "@/components/Styles_pages/StyleCommun";

import MapView from "@/components/MapView";
import { useEffect, useState } from "react";
import adminService from "@/pages/api/adminService";

export default function CartePage() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await adminService.getStations();
        setStations(data);
      } catch (err) {
        console.error("Erreur récupération stations :", err);
      }
    };
    fetchStations();
  }, []);

  return (
      <>
        <WelcomeSection>
          <WelcomeTitle>Le terrain à portée de main</WelcomeTitle>
          <WelcomeSubtitle>
            Déplacez-vous sur la carte, identifiez les stations actives et suivez les changements de statut en temps réel.
          </WelcomeSubtitle>
        </WelcomeSection>
  
        <SectionTitle>Carte interactive</SectionTitle>
        
        <BigContainerUneSection>
          {/* La carte leaflet */}
          <MapView stations={stations} />
        </BigContainerUneSection>
      </>
    );
}
