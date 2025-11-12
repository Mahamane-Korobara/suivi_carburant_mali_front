import React from 'react';
import { FilterBar, FilterButton } from '@/components/Styles_pages/userStyles/UserStyles';

const filters = [
  { value: 'all', label: 'Tout' },
  { value: 'disponible', label: 'Disponible' },
  { value: 'peu', label: 'Peu' },
  { value: 'rupture', label: 'Rupture' },
];


export default function FilterBarComponent({ activeFilter, onFilterChange }) {
  return (
    <FilterBar>
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          value={filter.value} 
          active={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FilterBar>
  );
}