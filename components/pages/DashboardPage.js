import {
  StatCard,
  StatTitle,
  StatValue,
  StatBadge,
  CommunesList,
  CommuneItem,
  CommuneName,
  CommuneCount
} from "@/components/Styles_pages/DashboardStyles";
import {
  BigContainer,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
} from "@/components/Styles_pages/StyleCommun";

export default function DashboardPage() {
  return (
    <>
      <WelcomeSection>
        <WelcomeTitle>Bienvenue sur KARBU</WelcomeTitle>
        <WelcomeSubtitle>Votre meilleure expérience de gestion de carburant commence ici</WelcomeSubtitle>
      </WelcomeSection>

      {/* Stats Stations */}
      <SectionTitle>Stations</SectionTitle>
      <BigContainer>
        <StatCard>
          <StatTitle>Stations approuvées</StatTitle>
          <StatValue>115</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Stations en attente</StatTitle>
          <StatValue>28</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Stations rejetées</StatTitle>
          <StatValue>36</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Taux d'approbation</StatTitle>
          <StatValue>72%</StatValue>
        </StatCard>

      </BigContainer>

      {/* Stats Interactions */}
      <SectionTitle>Interactions Usagers</SectionTitle>
      <BigContainer>
        <StatCard>
          <StatTitle>Totales interactions usagers</StatTitle>
          <StatValue>2284</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Visites aujourd'hui</StatTitle>
          <StatValue>422</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Visites cette semaine</StatTitle>
          <StatValue>1503</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Nouvelles stations (30j)</StatTitle>
          <StatValue>12</StatValue>
        </StatCard>
      </BigContainer>

      {/* Stats Carburant */}
      <SectionTitle>Disponibilité Carburant</SectionTitle>
      <BigContainer>
        <StatCard>
          <StatTitle>Points disponibles</StatTitle>
          <StatValue>527</StatValue>
          <StatBadge positive>Disponible</StatBadge>
        </StatCard>

        <StatCard>
          <StatTitle>En rupture</StatTitle>
          <StatValue>433</StatValue>
          <StatBadge negative>Rupture</StatBadge>
        </StatCard>

        <StatCard>
          <StatTitle>Stock limité</StatTitle>
          <StatValue>100</StatValue>
          <StatBadge warning>Limité</StatBadge>
        </StatCard>

        <StatCard>
          <StatTitle>Total points carburant</StatTitle>
          <StatValue>896</StatValue>
        </StatCard>
      </BigContainer>

      {/* Top Communes */}
      <SectionTitle>Top 5 Communes</SectionTitle>
      <CommunesList>
          <CommuneItem>
            <CommuneName>Commune V</CommuneName>
            <CommuneCount>38 stations</CommuneCount>
          </CommuneItem>
      </CommunesList>
    </>
  );
}


// export default function DashboardPage() {
//   const [stats, setStats] = useState(null);
//   const [fuelStats, setFuelStats] = useState(null);

//   useEffect(() => {
//     // Stats générales
//     fetch('/api/admin/stats')
//       .then(res => res.json())
//       .then(setStats);
    
//     // Stats carburant
//     fetch('/api/admin/fuel-stats')
//       .then(res => res.json())
//       .then(setFuelStats);
//   }, []);

//   if (!stats || !fuelStats) return <div>Chargement...</div>;

//   return (
//     <>
//       <WelcomeSection>
//         <WelcomeTitle>Bienvenue sur KARBU</WelcomeTitle>
//         <WelcomeSubtitle>Votre meilleure expérience de gestion de carburant commence ici</WelcomeSubtitle>
//       </WelcomeSection>

      // {/* Stats Stations */}
      // <SectionTitle>Stations</SectionTitle>
//       <BigContainer>
//         <StatCard>
//           <StatTitle>Stations approuvées</StatTitle>
//           <StatValue>{stats.approved}</StatValue>
//           <StatBadge positive>+{stats.approved_this_week} cette semaine</StatBadge>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Stations en attente</StatTitle>
//           <StatValue>{stats.pending}</StatValue>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Stations rejetées</StatTitle>
//           <StatValue>{stats.rejected}</StatValue>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Taux d'approbation</StatTitle>
//           <StatValue>{stats.approval_rate}%</StatValue>
//         </StatCard>
//       </BigContainer>

//       {/* Stats Interactions */}
//       <SectionTitle>Interactions Usagers</SectionTitle>
//       <BigContainer>
//         <StatCard>
//           <StatTitle>Total visites</StatTitle>
//           <StatValue>{stats.total_visits}</StatValue>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Visites aujourd'hui</StatTitle>
//           <StatValue>{stats.visits_today}</StatValue>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Visites cette semaine</StatTitle>
//           <StatValue>{stats.visits_this_week}</StatValue>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Nouvelles stations (30j)</StatTitle>
//           <StatValue>{stats.new_this_month}</StatValue>
//         </StatCard>
//       </BigContainer>

//       {/* Stats Carburant */}
//       <SectionTitle>Disponibilité Carburant</SectionTitle>
//       <BigContainer>
//         <StatCard>
//           <StatTitle>Points disponibles</StatTitle>
//           <StatValue>{fuelStats.available}</StatValue>
//           <StatBadge positive>Disponible</StatBadge>
//         </StatCard>

//         <StatCard>
//           <StatTitle>En rupture</StatTitle>
//           <StatValue>{fuelStats.out_of_stock}</StatValue>
//           <StatBadge negative>Rupture</StatBadge>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Stock limité</StatTitle>
//           <StatValue>{fuelStats.limited}</StatValue>
//           <StatBadge warning>Limité</StatBadge>
//         </StatCard>

//         <StatCard>
//           <StatTitle>Total points carburant</StatTitle>
//           <StatValue>{fuelStats.total_fuel_points}</StatValue>
//         </StatCard>
//       </BigContainer>

//       {/* Détail par type de carburant */}
//       <SectionTitle>Par Type de Carburant</SectionTitle>
//       <FuelGrid>
//         {fuelStats.by_fuel_type.map(fuel => (
//           <FuelCard key={fuel.id}>
//             <FuelName>{fuel.name}</FuelName>
//             <FuelStats>
//               <FuelStat>
//                 <span>Disponible:</span>
//                 <strong className="text-green-600">{fuel.available}</strong>
//               </FuelStat>
//               <FuelStat>
//                 <span>Rupture:</span>
//                 <strong className="text-red-600">{fuel.out_of_stock}</strong>
//               </FuelStat>
//               <FuelStat>
//                 <span>Limité:</span>
//                 <strong className="text-orange-600">{fuel.limited}</strong>
//               </FuelStat>
//             </FuelStats>
//             <FuelProgress>
//               <ProgressBar 
//                 percentage={fuel.availability_rate}
//                 color={fuel.availability_rate > 70 ? 'green' : fuel.availability_rate > 40 ? 'orange' : 'red'}
//               />
//               <ProgressLabel>{fuel.availability_rate}% disponible</ProgressLabel>
//             </FuelProgress>
//           </FuelCard>
//         ))}
//       </FuelGrid>

//       {/* Top Communes */}
//       <SectionTitle>Top 5 Communes</SectionTitle>
//       <CommunesList>
//         {stats.top_communes.map(commune => (
//           <CommuneItem key={commune.commune}>
//             <CommuneName>{commune.commune}</CommuneName>
//             <CommuneCount>{commune.total} stations</CommuneCount>
//           </CommuneItem>
//         ))}
//       </CommunesList>
//     </>
//   );
// }