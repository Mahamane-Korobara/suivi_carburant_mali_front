import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { icons } from "@/components/Icons";
import { Menu, X } from "lucide-react";

import {
    LayoutContainer,
    Content,
    MenuButton,
    Overlay
} from "@/components/Styles_pages/DashboardStyles";

import DashboardPage from "@/components/pages/DashboardPage";
import StationsPage from "@/components/pages/StationsPage";
import UsagersPage from "@/components/pages/UsagersPage";
import CartePage from "@/components/pages/CartePage";
import AlertesPage from "@/components/pages/AlertesPage";
import RapportsPage from "@/components/pages/RapportsPage";

// Mapping des pages
const pages = {
  dashboard: DashboardPage,
  stations: StationsPage,
  carte: CartePage,
  usagers: UsagersPage,
  alertes: AlertesPage,
  rapports: RapportsPage,
};

const items = [
  { key: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { key: "stations", label: "Stations", icon: icons.stations },
  { key: "carte", label: "Carte", icon: icons.carte },
  { key: "usagers", label: "Usagers", icon: icons.usagers },
  { key: "alertes", label: "Alertes", icon: icons.alertes },
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
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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