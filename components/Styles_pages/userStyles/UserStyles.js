import styled from "styled-components";

export const UserContainer = styled.div`
  background: #1e1e1e;
  min-height: 100vh;
  padding: 1rem;
  color: white;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #2d2d2d;
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
`;

const statusColors = {
  disponible: '#2ecc71', // vert
  peu: '#f39c12',        // orange
  rupture: '#e74c3c',    // rouge
  all: '#34495e'         // gris
};

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ active, value }) => active ? statusColors[value] || '#34495e' : '#34495e'};
  color: ${({ active }) => active ? 'white' : '#bdc3c7'};

  &:hover {
    background-color: ${({ active, value }) => active ? statusColors[value] || '#34495e' : '#2c3e50'};
  }
`;


export const StationCard = styled.div`
  background: #2d2d2d;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const StationDistance = styled.span`
  color: #bdc3c7;
  font-size: 0.85rem;
  margin-right: 0.5rem;
`;

export const StationName = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const StationAddress = styled.p`
  color: #bdc3c7;
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

export const FuelTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

export const FuelTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;

  ${({ status }) => {
    switch (status) {
      case 'disponible':
        return `
          background-color: #2ecc71;
          border: 1px solid #27ae60;
        `;
      case 'peu':
        return `
          background-color: #f39c12;
          border: 1px solid #e67e22;
        `;
      case 'rupture':
        return `
          background-color: #e74c3c;
          border: 1px solid #c0392b;
        `;
      default:
        return `
          background-color: #95a5a6;
          border: 1px solid #7f8c8d;
        `;
    }
  }}
`;

export const ReportButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e67e22;
  }
`;