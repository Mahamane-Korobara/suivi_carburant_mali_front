import React, { useState } from 'react';
import { PageContainer } from '@/components/Styles_pages/stationStyles/FuelStyles';
import FuelStatusPage from '@/components/pages/stationPages/fuel-status-page';
import FuelHistoryPage from '@/components/pages/stationPages/fuel-history-page';

export default function StationFuelLayout() {
  const [currentView, setCurrentView] = useState('status'); // 'status' | 'history'

  return (
    <PageContainer>
      {currentView === 'status' ? (
        <FuelStatusPage onNavigateToHistory={() => setCurrentView('history')} />
      ) : (
        <FuelHistoryPage onNavigateToStatus={() => setCurrentView('status')} />
      )}
    </PageContainer>
  );
}