import {
    SidebarContainer,
    SidebarItem,
    TextTitre
} from "@/components/DashboardStyles";
import Image from 'next/image';



export default function Sidebar({ items, onSelect, selected, isOpen }) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "1rem" }}>
        <TextTitre>
          <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>RED PRODUCT</span>
        </TextTitre>
          <span style={{ fontSize: "1rem", color: "#666", width: "100%", textAlign: "left" }}>Principal</span>
      </div>

      {items.map((item) => (
        <SidebarItem
          key={item.key}
          onClick={() => onSelect(item.key)}
          active={selected === item.key}
        >
         <div style={{ display: "flex", alignItems: "center" }}>
            {item.icon && (
            <Image
              src={item.icon}
              alt={item.label}
              width={20}
              height={20}
              style={{ marginRight: "8px" }}
            />
          )}
          <span>{item.label}</span>
         </div>
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
}
