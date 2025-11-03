import styled from "styled-components";
import NextLink from "next/link";

// Conteneur global centré
export const Page = styled.div`
  background-color: #494C4F;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

// Carte du formulaire
export const Card = styled.div`
  background: #ffffff;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  padding: 1.5rem;
  text-align: center;
`;

//Logo + nom du produit
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffffff;
`;

export const Formulaire = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

// Titre du formulaire
export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-weight: normal;
  text-align: left;
`;

// Inputs
export const Input = styled.input`
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

// Checkbox + label
export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: left;
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

// Bouton de soumission
export const SubmitButton = styled.button`
  width: 100%;
  background-color: #3c3c3c;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

// Lien en bas
export const Text = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
`;


export const Link = styled(NextLink)`
  color: #f7b32b;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
`;