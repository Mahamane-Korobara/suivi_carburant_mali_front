import {
  BigContainerUneSection
} from "@/components/Styles_pages/StyleCommun";

import MapView from "@/components/MapView";
import { useEffect, useState } from "react";
import adminService from "@/pages/api/adminService";
import PageHeader from "@/components/adminPageHeader";

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

        <PageHeader
          title="Le terrain à portée de main"
          subtitle="Déplacez-vous sur la carte, identifiez les stations actives et suivez les changements de statut en temps réel."
          sectionTitle="Carte interactive"
        />

        <BigContainerUneSection>
          {/* La carte leaflet */}
          <MapView stations={stations} />
        </BigContainerUneSection>
      </>
    );
}
