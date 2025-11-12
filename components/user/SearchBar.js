import React from 'react';
import { SearchBar } from '@/components/Styles_pages/userStyles/UserStyles';

export default function SearchBarComponent({ value, onChange, placeholder = "Rechercher par nom ou par quartier..." }) {
  return (
    <SearchBar
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}