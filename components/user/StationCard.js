import React from 'react';
import { StationCard, StationDistance, StationName, StationAddress, FuelTags, FuelTag, ReportButton } from '@/components/Styles_pages/userStyles/UserStyles';

export default function StationCardComponent({ station, onReport }) {
  const { name, address, distance, fuelTypes } = station;

  return (
    <StationCard>
      <StationDistance>{distance} km</StationDistance>
      <StationName>{name}</StationName>
      <StationAddress>{address}</StationAddress>

      <FuelTags>
  {fuelTypes.map((fuel, index) => (
  <FuelTag key={index} status={fuel?.status}>
    {String(fuel?.type)}
  </FuelTag>
))}

</FuelTags>

      <ReportButton onClick={onReport}>
        ⚠️ Signaler
      </ReportButton>
    </StationCard>
  );
}