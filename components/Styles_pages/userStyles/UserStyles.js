import styled from "styled-components";

export const UserContainer = styled.div`
  background: #494C4F;
  min-height: 100vh;
  padding: 1rem;
  color: white;
`;

export const SearchBar = styled.input`
  width: 90%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 1px solid transparent;
  background: #362c2cde;
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    &:focus {
    outline: none;
    border-color: #f39c12;
  }
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
  disponible: '#f39c12', 
  peu: '#f39c12',        
  rupture: '#f39c12',    
  all: '#f39c12'        
};

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: none;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ active, value }) => active ? statusColors[value] || '#362c2cde' : '#362c2cde'};
  color: ${({ active }) => active ? 'white' : '#bdc3c7'};

  &:hover {
    background-color: ${({ active, value }) => active ? statusColors[value] || '#362c2cde' : '#362c2cde'};
  }
`;


export const StationCard = styled.div`
  display: flex;
  flex-direction: column; /* contenu vertical */
  background: #362c2cde;
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
  border-radius: 0.3rem;
  border: none;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;

  ${({ status }) => {
    switch (status) {
      case 'disponible':
        return `
          background-color: #81dba7ff;
          color: green;
        `;
      case 'peu':
        return `
          background-color: #f7b449ff;
          color: #8a5809ff;
        `;
      case 'rupture':
        return `
          background-color: #e07266ff;
          color: #7f1d1dff;
        `;
      default:
        return `
          background-color: #95a5a6;
        `;
    }
  }}
`;

export const ReportButton = styled.button`
  align-self: flex-end; /* pousse le bouton à droite */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  margin-top: 1rem;
  background-color: #f39c12;
  color: black;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e67e22;
  }
`;


// Styles pour la page de signalement

export const FormContainer = styled.div`

`;

export const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
`;

export const Select = styled.select`
  width: 98%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: #414a5aff;
  color: white;
  font-size: 1rem;
  margin-bottom: 1.75rem;
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

export const TextArea = styled.textarea`
  width: 90%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid stransparent;
  background: #414a5aff;
  color: white;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #e67e22; }
  &:disabled { background: #95a5a6; cursor: not-allowed; }
`;

export const PageContainer = styled.div`
  background: #494C4F;
  min-height: 100vh;
  padding: 1rem;
  color: white;
`;