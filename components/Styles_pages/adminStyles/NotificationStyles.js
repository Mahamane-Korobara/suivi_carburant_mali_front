import styled from "styled-components";

export const NotificationCard = styled.div`
  background: ${props => props.isRead ? '#f8f9fa' : 'white'};
  border: 1px solid ${props => props.isRead ? '#e9ecef' : '#dee2e6'};
  border-left: 4px solid ${props => props.isRead ? '#6c757d' : '#007bff'};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

export const NotificationTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.isRead ? '#6c757d' : '#212529'};
  margin: 0;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const NotificationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.isRead ? '#e9ecef' : '#007bff'};
  color: ${props => props.isRead ? '#6c757d' : 'white'};
  white-space: nowrap;
`;

export const NotificationMessage = styled.p`
  font-size: 0.9rem;
  color: ${props => props.isRead ? '#868e96' : '#495057'};
  margin: 0.5rem 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const NotificationDate = styled.span`
  font-size: 0.8rem;
  color: #adb5bd;
  display: block;
  margin-top: 0.5rem;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.variant === 'primary' ? '#007bff' : 
    props.variant === 'success' ? '#28a745' : 
    '#6c757d'
  };
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.45rem 0.875rem;
    font-size: 0.8rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #868e96;
  font-size: 1rem;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;
