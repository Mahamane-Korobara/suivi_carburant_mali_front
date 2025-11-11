import React from 'react';
import { StatusButton } from '@/components/Styles_pages/stationStyles/FuelStyles';

const FuelStatusButton = ({ status, isActive, onClick }) => {
  return (
    <StatusButton
      status={status}
      isActive={isActive}
      onClick={onClick}
    >
      {status}
    </StatusButton>
  );
};

export default FuelStatusButton;