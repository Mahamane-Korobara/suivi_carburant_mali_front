import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { icons } from "@/components/Icons";
import { Menu, X } from "lucide-react";

import {
    LayoutContainer,
    Content,
    MenuButton,
    Overlay
} from "@/components/Styles_pages/SidebarStyles";

import DashboardPage from "@/components/pages/DashboardPage";
import StationsPage from "@/components/pages/StationsPage";
import CartePage from "@/components/pages/CartePage";
import SignalementPage from "@/components/pages/SignalementPage";
import RapportsPage from "@/components/pages/RapportsPage";

// Mapping des pages
const pages = {
  dashboard: DashboardPage,
  stations: StationsPage,
  carte: CartePage,
  signalement: SignalementPage,
  rapports: RapportsPage,
};

const items = [
  { key: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { key: "stations", label: "Stations", icon: icons.stations },
  { key: "carte", label: "Carte", icon: icons.carte },
  { key: "signalement", label: "Signalement", icon: icons.alertes },
  { key: "rapports", label: "Rapports", icon: icons.rapports },
];

export default function DashboardLayout() {
  const [selected, setSelected] = useState(items[0].key);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [selected]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Récupère le composant de la page sélectionnée
  const PageComponent = pages[selected] || pages.dashboard;

  return (
    <LayoutContainer>
      <Overlay isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      <MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} style={{ display: 'none' }} /> : <Menu size={24} />}
      </MenuButton>
      <Sidebar 
        items={items} 
        onSelect={setSelected} 
        selected={selected} 
        isOpen={isMobileMenuOpen}
      />
      <Content onClick={() => isMobileMenuOpen && closeMobileMenu()}>
        <PageComponent />
      </Content>
    </LayoutContainer>
  );
}