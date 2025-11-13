import React from 'react';
import ReportForm from '@/components/user/ReportForm';
import { useRouter } from 'next/router';
import { PageContainer } from '@/components/Styles_pages/userStyles/UserStyles';
import PublicPageHeader from '@/components/usagerPageHeader';

export default function ReportPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleSuccess = () => {
    alert("Signalement envoyé avec succès !\nMerci pour votre contribution");
    router.back(); // Retour à la liste des stations
  };

  if (!id) {
    return <PageContainer>Chargement...</PageContainer>;
  }

  return (
    <PageContainer>
      <PublicPageHeader centerText="Signalement" />
      <ReportForm stationId={id} onSuccess={handleSuccess} />
    </PageContainer>
  );
}