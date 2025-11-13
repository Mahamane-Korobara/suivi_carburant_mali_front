import React from 'react';
import ReportForm from '@/components/user/ReportForm';
import { useRouter } from 'next/router';
import { PageContainer } from '@/components/Styles_pages/userStyles/UserStyles';
import PublicPageHeader from '@/components/usagerPageHeader';

export default function ReportPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleSuccess = () => {
    alert("Signalement envoyé avec succès !\nMerci pour votre contribution 🙏");
    router.push('/user-stations'); // Retour à la liste des stations
  };

  if (!id) {
    return (
      <PageContainer>
        <PublicPageHeader centerText="Signalement" />
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          Chargement...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PublicPageHeader centerText="Signalement" />
      <ReportForm stationId={id} onSuccess={handleSuccess} />
    </PageContainer>
  );
}