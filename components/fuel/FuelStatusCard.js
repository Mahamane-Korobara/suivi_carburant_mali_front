import React, { useState } from 'react';
import { FuelContainer, FuelHeader, FuelName, StatusBadge, ButtonGroup } from '@/components/Styles_pages/stationStyles/FuelStyles';
import FuelStatusButton from '@/components/fuel/FuelStatusButton';

const FuelStatusCard = ({ fuelType, initialStatus, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const handleStatusClick = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(fuelType, newStatus);
    }
  };

  return (
    <FuelContainer>
      <FuelHeader>
        <FuelName>{fuelType}</FuelName>
        <StatusBadge status={currentStatus}>{currentStatus}</StatusBadge>
      </FuelHeader>

      <ButtonGroup>
        <FuelStatusButton
          status="Disponible"
          isActive={currentStatus === "Disponible"}
          onClick={() => handleStatusClick("Disponible")}
        />
        <FuelStatusButton
          status="Peu"
          isActive={currentStatus === "Peu"}
          onClick={() => handleStatusClick("Peu")}
        />
        <FuelStatusButton
          status="Rupture"
          isActive={currentStatus === "Rupture"}
          onClick={() => handleStatusClick("Rupture")}
        />
      </ButtonGroup>
    </FuelContainer>
  );
};

export default FuelStatusCard;