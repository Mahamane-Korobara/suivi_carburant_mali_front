import styled from "styled-components";

export const FuelContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const FuelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const FuelName = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  color: white;

  ${({ status }) => {
    switch (status) {
      case 'Disponible':
        return `
          background-color: #2ecc71;
          border: 1px solid #27ae60;
        `;
      case 'Peu':
        return `
          background-color: #f39c12;
          border: 1px solid #e67e22;
        `;
      case 'Rupture':
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

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f4f4f4;
  padding: 0.2rem;
  border-radius: 0.5rem;
`;

export const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ isActive }) => {
    if (isActive) {
      return '#f7b32b';
    }
    return 'transparent';
  }};

  color: ${({ isActive }) => {
    if (isActive) {
      return '#2b2b2bd7';
    }
    return 'gray';
  }};


  &:hover {
    background-color: ${({ status }) => {
      switch (status) {
        case 'Disponible':
          return '#27ae60';
        case 'Peu':
          return '#e67e22';
        case 'Rupture':
          return '#c0392b';
        default:
          return '#7f8c8d';
      }
    }};
    color: white;
  }

  
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #f39c12;
  color: #faf5f5d7;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e67e22;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const BtnConteneur = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


//HISTORIQUE DES CHANGEMENTS

export const HistoryContainer = styled.div`
  background: #2d2d2d;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const IconBox = styled.div`
  background: #34495e;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

export const Content = styled.div`
  flex: 1;
`;

export const FuelNameH4 = styled.h4`
  font-weight: bold;
  color: white;
  margin: 0 0 0.25rem 0;
`;

export const StatusChange = styled.p`
  color: ${({ status }) => {
    switch (status) {
      case 'Disponible':
        return '#2ecc71';
      case 'Indisponible':
        return '#e74c3c';
      case 'Peu':
        return '#f39c12';
      default:
        return '#95a5a6';
    }
  }};
  font-weight: bold;
  margin: 0 0 0.25rem 0;
`;

export const DateText = styled.span`
  color: #bdc3c7;
  font-size: 0.85rem;
`;

export const StatusIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  margin-left: 0.5rem;

  background-color: ${({ status }) => {
    switch (status) {
      case 'success':
        return '#2ecc71';
      case 'warning':
        return '#f39c12';
      case 'error':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  }};
`;

export const PageContainer = styled.div`
  padding: 0.3rem;
  background-color: #23272f;
  min-height: 100vh;
`;

//DANS PAGE HISTORIQUE
export const Header = styled.h1`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;


export const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f39c12;
  color: #faf5f5d7;
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