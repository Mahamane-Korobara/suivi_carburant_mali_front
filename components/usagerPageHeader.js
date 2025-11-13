import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { icons } from '@/components/utils/icons/Icons';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const LeftButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e67e22;
  }
`;

const CenterText = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  color: white;
  text-align: center;
  flex: 1; /* prend tout l’espace disponible */
`;

const RightText = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
`;

export default function PublicPageHeader({ centerText = "Bienvenue sur KARBU" }) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/");
  };

  return (
    <HeaderContainer>
      <RightText>KARBU</RightText>
      <CenterText>{centerText}</CenterText>
      <LeftButton onClick={handleLoginRedirect}>{icons.connexion}</LeftButton>
    </HeaderContainer>
  );
}
