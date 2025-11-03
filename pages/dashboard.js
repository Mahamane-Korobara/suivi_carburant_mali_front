import { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import Image from 'next/image';
import { StatsGrid, StatCard, StatIcon, StatInfo, StatValue, StatLabel } from "@/components/DashboardStyles";
import { MdPersonOutline } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

const DashboardStats = () => {
  const stats = [
    {
      icon: <MdPersonOutline />,
      value: "125",
      label: "Formulaires",
      color: "#8b5cf6",
      bgColor: "#ede9fe"
    },
    {
      icon: <MdMailOutline />,
      value: "40",
      label: "Messages",
      color: "#10b981",
      bgColor: "#dcfce7"
    },
    {
      icon: <MdOutlineMessage />,
      value: "25",
      label: "E-mails",
      color: "#f43f5e",
      bgColor: "#ffe4e6"
    },
    {
      icon: <BsPeople />,
      value: "600",
      label: "Utilisateurs",
      color: "#f59e0b",
      bgColor: "#fef3c7"
    }
  ];

  return (
    <StatsGrid>
      {stats.map((stat, index) => (
        <StatCard key={index}>
          <StatIcon color={stat.color} bgColor={stat.bgColor}>
            {stat.icon}
          </StatIcon>
          <StatInfo>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatInfo>
        </StatCard>
      ))}
    </StatsGrid>
  );
};

const hotels = [
  {
    id: 1,
    name: "Hôtel Terrou-Bi",
    location: "Boulevard Martin Luther King Dakar, 11500",
    price: "25.000 XOF",
    image: "/images/Terrou.jpg"
  },
  {
    id: 2,
    name: "Rte des Almadies, Dakar",
    location: "King Fahd Palace",
    price: "20.000 XOF",
    image: "/images/King.png"
  },
  {
    id: 3,
    name: "Rte de la Corniche O, Dakar 16868",
    location: "Radisson Blu Hotel",
    price: "22.000 XOF",
    image: "/images/Radisson.jpg"
  },
  {
    id: 4,
    name: "Place de l'Independance, 10 Rue PL 29, Dakar",
    location: "Pullman Dakar Teranga",
    price: "30.000 XOF",
    image: "/images/Pullman.jpg"
  },
  {
    id: 5,
    name: "Lac Rose, Dakar",
    location: "Hôtel Lac Rose",
    price: "25.000 XOF",
    image: "/images/Lac.jpg"
  },
  {
    id: 6,
    name: "Mbour, Sénégal ",
    location: "Hôtel Saly",
    price: "20.000 XOF",
    image: "/images/Saly.jpg"
  },
  {
    id: 7,
    name: "BP64, Saly 23000",
    location: "Palm Beach Resort & Spa",
    price: "22.000 XOF",
    image: "/images/Beach.jpg"
  },
  {
    id: 8,
    name: "Place de l'Independance, 10 Rue PL 29, Dakar",
    location: "Pullman Dakar Teranga",
    price: "30.000 XOF",
    image: "/images/Teranga.jpg"
  }
];

import {
  TopBar,
  TopBarRow,
  TopBarTitle,
  TopBarActions,
  IconResponsive,
  SearchBox,
  SearchInput,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  HotelGrid,
  HotelCard,
  HotelImage,
  HotelInfo,
  HotelLocation,
  HotelName,
  HotelPrice,
  ButtonAjouter,
  PopupOverlay,
  PopupContent,
  PopupHeader,
  TwoInput,
  FormGroup,
  ImageUpload,
  SubmitButton
} from "@/components/DashboardStyles";

import { FaBell, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

function Accueil() {
  return (
    <div>
      <TopBar>
        <TopBarRow>
          <TopBarTitle>Dashboard</TopBarTitle>
          <TopBarActions>
            <SearchBox>
              <FaSearch color="#bbb" size={14} />
              <SearchInput placeholder="Recherche" />
            </SearchBox>
            <FaBell color="#23272f" size={18} style={{ cursor: 'pointer' }} />
           <IconResponsive>
             <FiUser color="#f7b32b" size={22} style={{ borderRadius: '50%', background: '#f7f7f7', padding: 2 }} />
            <FaSignOutAlt color="#27ae60" size={20} style={{ cursor: 'pointer' }} />
           </IconResponsive>
          </TopBarActions>
        </TopBarRow>
      </TopBar>
      <WelcomeSection>
        <WelcomeTitle>Bienvenue sur RED Product</WelcomeTitle>
        <WelcomeSubtitle>Votre meilleure expérience hôtelière commence ici</WelcomeSubtitle>
      </WelcomeSection>

      <DashboardStats />
    </div>
  );
}

function ListeHotels() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <TopBar>
        <TopBarRow>
          <TopBarTitle>Liste des hôtels</TopBarTitle>
          <TopBarActions>
            <SearchBox>
              <FaSearch color="#bbb" size={14} />
              <SearchInput placeholder="Recherche" />
            </SearchBox>
            <FaBell color="#23272f" size={18} style={{ cursor: 'pointer' }} />
            
           <IconResponsive>
             <FiUser color="#f7b32b" size={22} style={{ borderRadius: '50%', background: '#f7f7f7', padding: 2 }} />
            <FaSignOutAlt color="#27ae60" size={20} style={{ cursor: 'pointer' }} />
           </IconResponsive>
          </TopBarActions>
        </TopBarRow>
      </TopBar>
      <WelcomeSection style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <WelcomeTitle>Hôtels 8</WelcomeTitle>
        <ButtonAjouter onClick={() => setShowPopup(true)}>
          + Créer un nouveau hôtel
        </ButtonAjouter>
      </WelcomeSection>


      {showPopup && (
        <PopupOverlay onClick={() => setShowPopup(false)}>
          <PopupContent onClick={e => e.stopPropagation()}>
            <PopupHeader>
              <h2>CRÉER UN NOUVEAU HÔTEL</h2>
              <button onClick={() => setShowPopup(false)}>&times;</button>
            </PopupHeader>
            
            <form>
              <TwoInput>
                <FormGroup>
                  <label>Nom de l&apos;hôtel</label>
                  <input type="text" placeholder="CAP Marniane" />
                </FormGroup>
                
                <FormGroup>
                  <label>Adresse</label>
                  <input type="text" placeholder="Les îles du saloum, Mar Lodj" />
                </FormGroup>
              </TwoInput>
              
              <TwoInput>
                <FormGroup>
                  <label>E-mail</label>
                  <input type="email" placeholder="information@gmail.com" />
                </FormGroup>
                
                <FormGroup>
                  <label>Numéro de téléphone</label>
                  <input type="tel" placeholder="+221 77 777 77 77" />
                </FormGroup>
              </TwoInput>
              
              <TwoInput>
                <FormGroup>
                  <label>Prix par nuit</label>
                  <input type="text" placeholder="25.000 XOF" />
                </FormGroup>
                
                <FormGroup>
                  <label>Devise</label>
                  <select>
                    <option value="xof">F XOF</option>
                    <option value="euro">Euro</option>
                    <option value="dollar">Dollar</option>
                  </select>
                </FormGroup>
              </TwoInput>
              
              <ImageUpload>
                <p>Ajouter une photo</p>
              </ImageUpload>
              
              <SubmitButton type="submit">Enregistrer</SubmitButton>
            </form>
          </PopupContent>
        </PopupOverlay>
      )}
      <HotelGrid>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id}>
            <HotelImage>
              <Image
                src={hotel.image}
                alt={hotel.name}
                layout="responsive"
                width={300}
                height={200}
              />
            </HotelImage>
            <HotelInfo>
              <HotelLocation>{hotel.location}</HotelLocation>
              <HotelName>{hotel.name}</HotelName>
              <HotelPrice>{hotel.price} par nuit</HotelPrice>
            </HotelInfo>
          </HotelCard>
        ))}
      </HotelGrid>
    </div>
  );
}

const contentMap = {
  dashboard: <Accueil />,
  liste_hotels: <ListeHotels />
};

export default function DashboardPage() {
  return (
    <DashboardLayout
      renderContent={(selected) => contentMap[selected] || <Accueil />}
    />
  );
}
