import styled from "styled-components";

export const BigContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    grid-template-columns: 1fr;
  }
`;

export const BigContainerUneSection = styled.div`
    gap: 1.5rem;
    padding: 2rem;
    @media (max-width: 768px) {
      padding: 0.2em;
  }
`;

export const WelcomeSection = styled.div`
  padding: 1.2rem 2rem;
  background: #fff;
  border-bottom: 1px solid #ececec;

  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
  }
`;

export const WelcomeTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  color: #23272f;
  margin: 0 0 0.2rem 0;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #23272f;
  margin: 2rem 2rem 1rem 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f7b32b;
  
  @media (max-width: 768px) {
    margin: 1.5rem 1rem 0.5rem 1rem;
    font-size: 1rem;
  }
`;