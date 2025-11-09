import {
  SidebarContainer,
  SidebarItem,
  TextTitre,
  LogOut
} from "@/components/Styles_pages/SidebarStyles";
import Image from 'next/image';
import { icons } from "@/public/icons/Icons";
import { useRouter } from "next/navigation";
import AdminService from "@/pages/api/adminService";
import StationService from "@/pages/api/stationService";

export default function Sidebar({ items, onSelect, selected, isOpen }) {
  const router = useRouter();

  const handleLogout = async () => {
    const userType = localStorage.getItem("userType");

    try {
      if (userType === "admin") await AdminService.logout();
      else if (userType === "station") await StationService.logout();
    } catch (error) {
      console.error("Erreur logout:", error);
    } finally {
      localStorage.clear();
      router.push("/");
    }
  };

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

      <LogOut
        onClick={handleLogout}
        style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
      >
        {icons.deconnexion}
        <span>Déconnexion</span>
      </LogOut>
    </SidebarContainer>
  );
}
