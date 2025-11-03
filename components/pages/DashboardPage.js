import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
} from "@/components/Styles_pages/DashboardStyles";
export default function DashboardPage() {
  return (
    <WelcomeSection>
        <WelcomeTitle>Bienvenue sur KARBU</WelcomeTitle>
        <WelcomeSubtitle>Votre meilleure expérience de gestion de carburant commence ici</WelcomeSubtitle>
    </WelcomeSection>
  );
}