import React from 'react';
import { HistoryContainer, IconBox, Content, FuelNameH4, StatusChange, DateText, StatusIcon } from '@/components/Styles_pages/stationStyles/FuelStyles';
import { icons } from "@/components/utils/icons/Icons";
export default function FuelHistoryCard({ fuelType, oldStatus, newStatus, date, statusIcon }) {
  const getIcon = () => {
    if (statusIcon === 'success') return '✓';
    if (statusIcon === 'warning') return '!';
    if (statusIcon === 'error') return '!';
    return '?';
  };

  return (
    <HistoryContainer>
      <IconBox>{icons.stations}</IconBox>
      <Content>
        <FuelNameH4>{fuelType}</FuelNameH4>
        <StatusChange status={newStatus}>
          Statut passé de <span style={{ color: '#95a5a6' }}>{oldStatus}</span> à <strong>{newStatus}</strong>
        </StatusChange>
        <DateText>{date}</DateText>
      </Content>
      <StatusIcon status={statusIcon}>{getIcon()}</StatusIcon>
    </HistoryContainer>
  );
}