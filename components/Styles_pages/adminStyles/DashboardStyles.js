import styled from "styled-components";

export const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #23272f;
  margin-bottom: 0.5rem;
`;


export const StatBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 12px;
  margin-top: 0.5rem;
  
  background: ${({ positive, negative, warning }) => {
    if (positive) return '#d4edda';
    if (negative) return '#f8d7da';
    if (warning) return '#fff3cd';
    return '#e2e3e5';
  }};
  
  color: ${({ positive, negative, warning }) => {
    if (positive) return '#155724';
    if (negative) return '#721c24';
    if (warning) return '#856404';
    return '#383d41';
  }};
`;

export const CommunesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem 1rem 1rem;
  }
`;

export const CommuneItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const CommuneName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #23272f;
`;

export const CommuneCount = styled.span`
  font-size: 0.9rem;
  color: #666;
  background: #f5f6fa;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 500;
`;

export const FuelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem 1rem 1rem;
    grid-template-columns: 1fr;
  }
`;

export const FuelCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const FuelName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #23272f;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f7b32b;
`;

export const FuelStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

export const FuelStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;

  span {
    color: #666;
  }

  strong {
    font-weight: 600;
    font-size: 1rem;
  }
`;

export const FuelProgress = styled.div`
  margin-top: 1rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.percentage || 0}%;
    background: ${props => {
      if (props.color === 'green') return '#28a745';
      if (props.color === 'orange') return '#ffc107';
      if (props.color === 'red') return '#dc3545';
      return '#6c757d';
    }};
    transition: width 0.3s ease;
    border-radius: 10px;
  }
`;

export const ProgressLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
  text-align: right;
  font-weight: 500;
`;

// Composant wrapper pour les badges avec variantes
export const BadgePositive = styled(StatBadge)`
  background: #d4edda;
  color: #155724;
`;

export const BadgeNegative = styled(StatBadge)`
  background: #f8d7da;
  color: #721c24;
`;

export const BadgeWarning = styled(StatBadge)`
  background: #fff3cd;
  color: #856404;
`;

// Style pour les cartes avec animation au survol
export const AnimatedCard = styled(StatCard)`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(247, 179, 43, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;