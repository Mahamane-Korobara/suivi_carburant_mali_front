import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  BigContainerUneSection
} from "@/components/Styles_pages/StyleCommun";
import { stations } from "@/public/data/stationsData";

import MapView from "@/components/MapView";
export default function CartePage() {
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