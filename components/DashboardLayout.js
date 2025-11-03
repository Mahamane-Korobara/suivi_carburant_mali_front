import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
    LayoutContainer,
    Content,
    MenuButton,
    Overlay
} from "@/components/DashboardStyles";
import { FaBars, FaTimes } from "react-icons/fa";

const items = [
  { key: "dashboard", label: "Dashboard", icon: "/images/dashboard.png" },
  { key: "liste_hotels", label: "Liste des Hôtels", icon: "/images/control.png" },
];

export default function DashboardLayout({ children, renderContent }) {
  const [selected, setSelected] = useState(items[0].key);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ferme le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [selected]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <LayoutContainer>
      <Overlay isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      <MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>
      <Sidebar 
        items={items} 
        onSelect={setSelected} 
        selected={selected} 
        isOpen={isMobileMenuOpen}
      />
      <Content onClick={() => isMobileMenuOpen && closeMobileMenu()}>
        {renderContent ? renderContent(selected) : children}
      </Content>
    </LayoutContainer>
  );
}
