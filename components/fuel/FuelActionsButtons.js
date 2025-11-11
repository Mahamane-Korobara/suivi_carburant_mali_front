import React from 'react';
import { ActionButton, BtnConteneur } from '@/components/Styles_pages/stationStyles/FuelStyles';

const FuelActionsButtons = ({ onAddClick, onHistoryClick }) => {
  return (
    <BtnConteneur>
      <ActionButton onClick={onHistoryClick}>
        Historique des changements
      </ActionButton>
      <ActionButton onClick={onAddClick}>
        Ajouter un type de carburant
      </ActionButton>
    </BtnConteneur>
  );
};

export default FuelActionsButtons;