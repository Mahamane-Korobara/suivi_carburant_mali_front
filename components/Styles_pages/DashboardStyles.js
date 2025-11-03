import styled from "styled-components";

export const WelcomeSection = styled.div`
  padding: 1.2rem 2rem;
  background: #fff;
  border-bottom: 1px solid #ececec;

  @media (max-width: 768px) {
    padding: 1rem;
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


export const SidebarContainer = styled.div`
  width: 220px;
  background: #23272f;
  color: #fff;
  min-height: 100vh;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

export const SidebarItem = styled.button`
  background: ${({ active }) => (active ? "white" : "transparent")};
  color: ${({ active }) => (active ? "black" : "white")};
  border: none;
  font-size: 1rem;
  text-align: left;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  width: 100%;

  &:hover {
    background: ${({ active }) => (active ? "white" : "rgba(255,255,255,0.1)")};
    color: ${({ active }) => (active ? "black" : "#f7b32b")};
  }
`;

export const TextTitre = styled.div`
  display: flex;
  gap: 4px;
`;
export const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

export const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: none;
  border: none;
  color: #23272f;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Content = styled.div`
  flex: 1;
  background: #f5f6fa;
  min-height: 100vh;
  overflow-x: hidden;
`;
