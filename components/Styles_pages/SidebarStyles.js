import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 220px;
  background: #23272f;
  color: #fff;
  min-height: 100vh;
  height: 100vh; // Hauteur fixe
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: fixed; // Position fixe
  left: 0;
  top: 0;
  overflow-y: auto; // Scroll dans la sidebar si nécessaire
  z-index: 100;
  transition: transform 0.3s ease;

  /* Personnalisation de la scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1d23;
  }

  &::-webkit-scrollbar-thumb {
    background: #3a3f47;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #4a4f57;
  }

  @media (max-width: 768px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    z-index: 1000;
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
  flex-shrink: 0; // Empêche les items de se compresser

  &:hover {
    background: ${({ active }) => (active ? "white" : "rgba(255,255,255,0.1)")};
    color: ${({ active }) => (active ? "black" : "#f7b32b")};
  }
`;

export const TextTitre = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0; // Empêche le titre de se compresser
 
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
  overflow: hidden; // Empêche le scroll global
`;

export const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: #23272f;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: #2d3139;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Content = styled.div`
  flex: 1;
  background: #f5f6fa;
  min-height: 100vh;
  margin-left: 220px; // Compense la largeur de la sidebar fixe
  overflow-x: hidden;
  overflow-y: auto; // Scroll uniquement dans le contenu
  
  @media (max-width: 768px) {
    margin-left: 0; // Pas de marge sur mobile
  }
`;