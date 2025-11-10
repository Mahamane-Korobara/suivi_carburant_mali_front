import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  /* Cache la scrollbar mais garde le scroll */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? '#f7b32b' : '#e6e9ef'};
  background: ${props => props.active ? '#f7b32b' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 2px 6px rgba(247, 179, 43, 0.3)' : 'none'};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
`;

export const SearchInput = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  width: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(2, 6, 23, 0.08);
    border-color: #f7b32b;
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (min-width: 769px) {
    min-width: 280px;
    max-width: 420px;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Empêche le zoom sur iOS */
  }
`;

// AFFICHAGE EN CARTES (MOBILE)
export const CardsContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const StationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
`;

export const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.9rem;
`;

export const CardLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

export const CardValue = styled.span`
  color: #111827;
  font-weight: 400;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
`;

// AFFICHAGE EN TABLEAU (DESKTOP)
export const TableContainer = styled.div`
  display: none;
  
  @media (min-width: 769px) {
    display: block;
    background: white;
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
    overflow-x: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  color: #6b7280;
  font-size: 0.85rem;
  font-weight: 600;
  border-bottom: 2px solid #eef2f6;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 12px 16px;
  vertical-align: middle;
  font-size: 0.95rem;
  color: #111827;
  border-bottom: 1px solid #f3f4f6;
`;

export const StatusButton = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 600;
  font-size: 0.85rem;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  opacity: ${props => props.disabled ? 0.6 : 1};

  background: ${props => {
    if (props.status === 'En attente') return '#fef3c7';
    if (props.status === 'Approuvé') return '#d1fae5';
    if (props.status === 'Désactivé') return '#fee2e2';
    return '#fecaca'; // Rejeté
  }};
  
  color: ${props => {
    if (props.status === 'En attente') return '#92400e';
    if (props.status === 'Approuvé') return '#065f46';
    if (props.status === 'Désactivé') return '#991b1b';
    return '#991b1b'; // Rejeté
  }};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 0.8rem;
  }
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  background: ${props => props.variant === 'primary' ? '#f7b32b' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#374151'};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#e09b1a' : '#f9fafb'};
    border-color: #f7b32b;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  background: white;
  border-radius: 12px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 40px 15px;
    font-size: 0.9rem;
  }
`;

export const ResultCount = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  padding: 0.5rem 0;
  
  strong {
    color: #111827;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

// Icon placeholders
export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;


// Pagination 
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const PaginationInfo = styled.div`
  font-size: 0.9rem;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  background: ${props => props.active ? '#f7b32b' : props.disabled ? '#f9fafb' : 'white'};
  color: ${props => props.active ? 'white' : props.disabled ? '#9ca3af' : '#374151'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  min-width: 36px;
  font-size: 0.9rem;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#e09b1a' : '#f9fafb'};
    border-color: #f7b32b;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.85rem;
    min-width: 32px;
  }
`;

export const PageSizeSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  background: white;
  color: #374151;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f7b32b;
  }

  &:focus {
    outline: none;
    border-color: #f7b32b;
    box-shadow: 0 0 0 3px rgba(247, 179, 43, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

// Badge pour indiquer qu'un statut est verrouillé
// export const LockedBadge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   font-size: 0.75rem;
//   color: #991b1b;
//   margin-left: 8px;
// `;