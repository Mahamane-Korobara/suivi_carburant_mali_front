import React from 'react';
import stationService from '@/pages/api/stationService';
import { useRouter } from 'next/router';
import { icons } from '@/components/utils/icons/Icons';
import { HeaderContainer, WelcomeTitleStation, LogoutButton } from '@/components/Styles_pages/StyleCommun';


export default function StationPageHeader({ welcomeText = "Bienvenue sur KARBU" }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await stationService.logout();
      localStorage.clear();
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la déconnexion : " + err.message);
    }
  };

  return (
    <HeaderContainer>
      <WelcomeTitleStation>{welcomeText}</WelcomeTitleStation>
      <LogoutButton onClick={handleLogout}>{icons.deconnexion}</LogoutButton>
    </HeaderContainer>
  );
}
