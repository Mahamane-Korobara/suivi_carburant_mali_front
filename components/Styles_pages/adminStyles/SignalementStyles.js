import styled from "styled-components";

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${props => props.color || '#f7b32b'};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
`;

// AFFICHAGE MOBILE - CARTES

export const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => {
    if (props.type === 'incident') return '#ef4444';
    if (props.type === 'erreur') return '#f59e0b';
    return '#6b7280';
  }};
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const TypeBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  
  background: ${props => {
    if (props.type === 'incident') return '#fee2e2';
    if (props.type === 'erreur') return '#fef3c7';
    return '#f3f4f6';
  }};
  
  color: ${props => {
    if (props.type === 'incident') return '#991b1b';
    if (props.type === 'erreur') return '#92400e';
    return '#374151';
  }};
`;

export const CardMessage = styled.p`
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
  margin: 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;


export const MessageCell = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #374151;
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.variant === 'danger' ? '#ef4444' : '#e6e9ef'};
  background: ${props => props.variant === 'danger' ? '#fef2f2' : props.variant === 'primary' ? '#f7b32b' : 'white'};
  color: ${props => props.variant === 'danger' ? '#991b1b' : props.variant === 'primary' ? 'white' : '#374151'};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => {
      if (props.variant === 'danger') return '#fee2e2';
      if (props.variant === 'primary') return '#e09b1a';
      return '#f9fafb';
    }};
    border-color: ${props => props.variant === 'danger' ? '#dc2626' : '#f7b32b'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 6px 10px;
    flex: 1;
  }
`;

export const DateText = styled.span`
  font-size: 0.85rem;
  color: #6b7280;
`;