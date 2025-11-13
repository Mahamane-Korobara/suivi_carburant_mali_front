import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { icons } from "@/components/utils/icons/Icons";
import { Menu, X } from "lucide-react";

import {
    LayoutContainer,
    Content,
    MenuButton,
    Overlay
} from "@/components/Styles_pages/adminStyles/SidebarStyles";

import DashboardPage from "@/components/pages/adminPages/DashboardPage";
import StationsPage from "@/components/pages/adminPages/StationsPage";
import CartePage from "@/components/pages/adminPages/CartePage";
import SignalementPage from "@/components/pages/adminPages/SignalementPage";
import NotificationsPage from "@/components/pages/adminPages/NotificationsPage";

// Mapping des pages
const pages = {
  dashboard: DashboardPage,
  stations: StationsPage,
  carte: CartePage,
  signalement: SignalementPage,
  notifications: NotificationsPage,
};

const items = [
  { key: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { key: "stations", label: "Stations", icon: icons.stations },
  { key: "carte", label: "Carte", icon: icons.carte },
  { key: "signalement", label: "Signalement", icon: icons.alertes },
  { key: "notifications", label: "Notifications", icon: icons.notifications },
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