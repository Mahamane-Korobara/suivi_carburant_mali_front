import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  BigContainerUneSection
} from "@/components/Styles_pages/StyleCommun";

import { useState, useMemo } from "react";
import { icons } from "@/components/Icons";
import {
  StatsRow,
  StatCard,
  StatLabel,
  StatValue,
  ReportCard,
  TypeBadge,
  CardMessage,
  MessageCell,
  ActionButton,
  DateText,
} from "@/components/Styles_pages/SignalementStyles";

import {
  Container,
  HeaderRow,
  SearchInput,
  FilterGroup,
  FilterButton,
  ResultCount,
  CardsContainer,
  CardHeader,
  CardTitle,
  CardRow,
  CardLabel,
  CardValue,
  CardActions,
  TableContainer,
  Table,
  Th,
  Td,
  EmptyState,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationButton,
  PageSizeSelect,
} from "@/components/Styles_pages/StationStyles";

// Données fictives
const initialReports = [
  { 
    id: 1, 
    station: { name: "Station Total Hamdallaye", commune: "Bamako" },
    type: "incident", 
    message: "Pompe en panne depuis 2 jours, pas d'essence disponible. Les clients sont obligés d'aller ailleurs.",
    created_at: "2024-11-04 10:30:00"
  },
  { 
    id: 2, 
    station: { name: "Station Shell Sikasso", commune: "Sikasso" },
    type: "erreur", 
    message: "Les prix affichés ne correspondent pas aux prix réels à la pompe. Différence de 50 FCFA/litre.",
    created_at: "2024-11-04 09:15:00"
  },
  { 
    id: 3, 
    station: { name: "Station Oryx Kayes", commune: "Kayes" },
    type: "autre", 
    message: "Horaires d'ouverture incorrects sur la plateforme. La station ferme à 18h et non 20h.",
    created_at: "2024-11-03 16:45:00"
  },
  { 
    id: 4, 
    station: { name: "Station Libya Oil Mopti", commune: "Mopti" },
    type: "incident", 
    message: "File d'attente de plus de 2 heures. Mauvaise organisation du personnel.",
    created_at: "2024-11-03 14:20:00"
  },
  { 
    id: 5, 
    station: { name: "Station Pétro Ségou", commune: "Ségou" },
    type: "erreur", 
    message: "L'adresse GPS est incorrecte, impossible de trouver la station avec les coordonnées indiquées.",
    created_at: "2024-11-02 11:30:00"
  },
  { 
    id: 6, 
    station: { name: "Station Total Tombouctou", commune: "Tombouctou" },
    type: "incident", 
    message: "Rupture de gasoil depuis une semaine. Pas de communication sur la date de réapprovisionnement.",
    created_at: "2024-11-02 08:50:00"
  },
  { 
    id: 7, 
    station: { name: "Station Petroci Gao", commune: "Gao" },
    type: "autre", 
    message: "Le numéro de téléphone de contact ne répond jamais. Impossible de joindre le gérant.",
    created_at: "2024-11-01 15:10:00"
  },
  { 
    id: 8, 
    station: { name: "Station Total Hamdallaye", commune: "Bamako" },
    type: "incident", 
    message: "Service client très désagréable. Le personnel refuse de servir certains clients.",
    created_at: "2024-11-01 12:40:00"
  },
  { 
    id: 9, 
    station: { name: "Station Shell Kidal", commune: "Kidal" },
    type: "erreur", 
    message: "Statut 'disponible' alors que la station est fermée pour travaux depuis 3 jours.",
    created_at: "2024-10-31 17:25:00"
  },
  { 
    id: 10, 
    station: { name: "Station Oryx Koutiala", commune: "Koutiala" },
    type: "autre", 
    message: "Photos de la station obsolètes. Demande de mise à jour avec nouvelles infrastructures.",
    created_at: "2024-10-31 09:00:00"
  },
];

const typeOptions = [
  { value: "all", label: "Tous" },
  { value: "incident", label: "Incidents" },
  { value: "erreur", label: "Erreurs" },
  { value: "autre", label: "Autres" },
];

// Fonction pour formater la date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function SignalementPage() {
  const [reports, setReports] = useState(initialReports);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Filtrage
  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchesQuery = [r.station.name, r.station.commune, r.message]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesType = typeFilter === "all" ? true : r.type === typeFilter;

      return matchesQuery && matchesType;
    });
  }, [reports, query, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReports = filtered.slice(startIndex, endIndex);

  // Reset page lors du filtrage
  useMemo(() => {
    setCurrentPage(1);
  }, [query, typeFilter, pageSize]);

  // Statistiques
  const stats = useMemo(() => {
    return {
      total: reports.length,
      incidents: reports.filter(r => r.type === 'incident').length,
      erreurs: reports.filter(r => r.type === 'erreur').length,
      autres: reports.filter(r => r.type === 'autre').length,
    };
  }, [reports]);

  const handleViewDetails = (report) => {
    alert(`Signalement #${report.id}\n\nStation: ${report.station.name}\nType: ${report.type}\nMessage: ${report.message}\nDate: ${formatDate(report.created_at)}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce signalement ?")) {
      setReports(prev => prev.filter(r => r.id !== id));
      alert("Signalement supprimé avec succès !");
    }
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={i === currentPage}
          onClick={() => goToPage(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    return pages;
  };

  return (
    <>
      <WelcomeSection>
        <WelcomeTitle>Gestion des signalements</WelcomeTitle>
        <WelcomeSubtitle>
          Consultez, analysez et gérez les signalements envoyés par les usagers concernant les stations-service.
          Chaque signalement contribue à améliorer la fiabilité du réseau et à maintenir la transparence sur le terrain.
        </WelcomeSubtitle>
      </WelcomeSection>

      <SectionTitle>Signalements</SectionTitle>

      <BigContainerUneSection>
        <Container>
          {/* Statistiques */}
          <StatsRow>
            <StatCard color="#3b82f6">
              <StatLabel>Total signalements</StatLabel>
              <StatValue>{stats.total}</StatValue>
            </StatCard>
            <StatCard color="#ef4444">
              <StatLabel>Incidents</StatLabel>
              <StatValue>{stats.incidents}</StatValue>
            </StatCard>
            <StatCard color="#f59e0b">
              <StatLabel>Erreurs</StatLabel>
              <StatValue>{stats.erreurs}</StatValue>
            </StatCard>
            <StatCard color="#6b7280">
              <StatLabel>Autres</StatLabel>
              <StatValue>{stats.autres}</StatValue>
            </StatCard>
          </StatsRow>

          <HeaderRow>
            {/* Filtres par type */}
            <FilterGroup>
              {typeOptions.map((option) => (
                <FilterButton
                  key={option.value}
                  active={typeFilter === option.value}
                  onClick={() => setTypeFilter(option.value)}
                >
                  {option.label}
                </FilterButton>
              ))}
            </FilterGroup>

            {/* Champ de recherche */}
            <SearchInput
              placeholder="Rechercher par station, commune ou message..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </HeaderRow>

          {/* Nombre de résultats */}
          <ResultCount>
            <strong>{filtered.length}</strong> signalement{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            {filtered.length > 0 && ` (page ${currentPage} sur ${totalPages})`}
          </ResultCount>

          {filtered.length === 0 ? (
            <EmptyState>
              {query ? 
                `Aucun signalement ne correspond à "${query}"` : 
                "Aucun signalement trouvé avec ce filtre."}
            </EmptyState>
          ) : (
            <>
              {/* AFFICHAGE MOBILE - CARTES */}
              <CardsContainer>
                {paginatedReports.map((r) => (
                  <ReportCard key={r.id} type={r.type}>
                    <CardHeader>
                      <CardTitle>{r.station.name}</CardTitle>
                      <TypeBadge type={r.type}>
                        {r.type === 'incident' && 'Incident'}
                        {r.type === 'erreur' && 'Erreur'}
                        {r.type === 'autre' && 'Autre'}
                      </TypeBadge>
                    </CardHeader>

                    <CardMessage>{r.message}</CardMessage>
                    
                    <CardRow>
                      <CardLabel>{icons.localisation} Commune</CardLabel>
                      <CardValue>{r.station.commune}</CardValue>
                    </CardRow>
                    
                    <CardRow>
                      <CardLabel>{icons.clock} Reçu</CardLabel>
                      <CardValue>{formatDate(r.created_at)}</CardValue>
                    </CardRow>

                    <CardActions>
                      <ActionButton variant="primary" onClick={() => handleViewDetails(r)}>
                        Voir détails
                      </ActionButton>
                      <ActionButton variant="danger" onClick={() => handleDelete(r.id)}>
                        Supprimer
                      </ActionButton>
                    </CardActions>
                  </ReportCard>
                ))}
              </CardsContainer>

              {/* AFFICHAGE DESKTOP - TABLEAU */}
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <Th>ID</Th>
                      <Th>Station</Th>
                      <Th>Commune</Th>
                      <Th>Type</Th>
                      <Th>Message</Th>
                      <Th>Date</Th>
                      <Th style={{ width: 180 }}>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedReports.map((r) => (
                      <tr key={r.id}>
                        <Td><strong>#{r.id}</strong></Td>
                        <Td><strong>{r.station.name}</strong></Td>
                        <Td>{r.station.commune}</Td>
                        <Td>
                          <TypeBadge type={r.type}>
                            {r.type === 'incident' && 'Incident'}
                            {r.type === 'erreur' && 'Erreur'}
                            {r.type === 'autre' && 'Autre'}
                          </TypeBadge>
                        </Td>
                        <Td>
                          <MessageCell title={r.message}>{r.message}</MessageCell>
                        </Td>
                        <Td>
                          <DateText>{formatDate(r.created_at)}</DateText>
                        </Td>
                        <Td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <ActionButton onClick={() => handleViewDetails(r)}>
                              Détails
                            </ActionButton>
                            <ActionButton variant="danger" onClick={() => handleDelete(r.id)}>
                              {icons.trash}
                            </ActionButton>
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationInfo>
                    Affichage {startIndex + 1} - {Math.min(endIndex, filtered.length)} sur {filtered.length}
                  </PaginationInfo>

                  <PaginationControls>
                    <PaginationButton
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                    >
                      ‹
                    </PaginationButton>

                    {renderPageNumbers()}

                    <PaginationButton
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                    >
                      ›
                    </PaginationButton>

                    <PageSizeSelect
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      <option value={5}>5 par page</option>
                      <option value={8}>8 par page</option>
                      <option value={15}>15 par page</option>
                      <option value={25}>25 par page</option>
                    </PageSizeSelect>
                  </PaginationControls>
                </PaginationContainer>
              )}
            </>
          )}
        </Container>
      </BigContainerUneSection>
    </>
  );
}