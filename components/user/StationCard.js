// src/components/User/StationCardComponent.jsx
import React from 'react';
import { useRouter } from 'next/router';
import { StationCard, StationDistance, StationName, StationAddress, FuelTags, FuelTag, ReportButton } from '@/components/Styles_pages/userStyles/UserStyles';
import { icons } from '@/components/utils/icons/Icons';
export default function StationCardComponent({ station }) {
  const { name, address, distance, fuelTypes } = station;
  const router = useRouter();

  const handleReportClick = () => {
    router.push(`/report-station/${station.id}`);
  };

  return (
    <StationCard>
      <StationDistance>{distance} km</StationDistance>
      <StationName>{name}</StationName>
      <StationAddress>{address}</StationAddress>

      <FuelTags>
        {fuelTypes.map((fuel, index) => (
          <FuelTag key={index} status={fuel.status}>
            {fuel.type}
          </FuelTag>
        ))}
      </FuelTags>

      <ReportButton onClick={handleReportClick}>
        {icons.flag} Signaler
      </ReportButton>
    </StationCard>
  );
}