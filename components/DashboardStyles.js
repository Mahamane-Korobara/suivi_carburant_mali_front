// Barre supérieure du dashboard
export const TopBar = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const TopBarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TopBarTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #23272f;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TopBarActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const IconResponsive = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  @media (max-width: 768px) {
    display: none; /* 👈 caché en mobile */
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  border-radius: 20px;
  padding: 0.2rem 1rem;
  margin-right: 1.2rem;
  border: 1px solid #ececec;
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  padding: 0.4rem 0.5rem;
  width: 140px;
`;

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
import styled from "styled-components";

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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;gap: 1.5rem;
  gap: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${props => props.bgColor || '#e3f2fd'};
  color: ${props => props.color || '#2196f3'};
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #23272f;
`;

export const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

export const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const HotelCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const HotelImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HotelInfo = styled.div`
  padding: 1rem;
`;

export const HotelLocation = styled.p`
  color: #8D4B38;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export const HotelName = styled.h3`
  margin: 0 0 1rem 0;
  color: #23272f;
  font-size: 1.2rem;
`;

export const HotelPrice = styled.p`
  margin: 0;
  color: #807d7dff;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const ButtonAjouter = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e0e0e0;
  padding: 8px 16px;
  border-radius: 10px;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f8f8;
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  padding: 24px;
  position: relative;
  overflow: auto;
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  h2 {
    font-size: 1.1rem;
    color: #333;
    margin: 0;
    font-weight: 500;
  }
  
  button {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
  }
`;

export const TwoInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 6px;
    color: #000;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  input {
    width: 90%;
    height: 30px;
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 0.9rem;
    background: #FAFAFA;
    color: #333;
    
    &::placeholder {
      color: #999;
    }
    
    &:focus {
      outline: none;
      border-color: #333;
      background: white;
    }
  }
  
  select {
    width: 100%;
    height: 47px;
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 0.9rem;
    background: #FAFAFA;
    color: #333;
    appearance: none;
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
    
    &:focus {
      outline: none;
      border-color: #333;
      background-color: white;
    }
  }
`;export const ImageUpload = styled.div`
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  
  &:hover {
    border-color: #0066ff;
  }
`;

export const SubmitButton = styled.button`
  background: #333;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  float: right;
  
  &:hover {
    background: #444;
  }
`;
