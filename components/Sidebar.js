import {
    SidebarContainer,
    SidebarItem,
    TextTitre,
    LogOut
} from "@/components/Styles_pages/SidebarStyles";
import Image from 'next/image';
import { icons } from "@/components/Icons";

export default function Sidebar({ items, onSelect, selected, isOpen }) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "1rem" }}>
        <TextTitre>
          <Image src="/images/logo2.svg" alt="Logo" width={30} height={30} />
          <span style={{ fontWeight: "bold", fontSize: "2rem" }}>KARBU</span>
        </TextTitre>
      </div>

      {items.map((item) => (
        <SidebarItem
          key={item.key}
          onClick={() => onSelect(item.key)}
          active={selected === item.key}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {item.icon}
            <span>{item.label}</span>
          </div>

        </SidebarItem>
      ))}
      <LogOut style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {icons.deconnexion}
            <span>Déconnexion</span>
      </LogOut>
    </SidebarContainer>
  );
}