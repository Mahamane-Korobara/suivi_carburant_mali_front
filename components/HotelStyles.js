import styled from 'styled-components';

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
  color: #666;
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
  color: #23272f;
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
  max-height: 80vh;
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
