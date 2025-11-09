import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  BigContainerUneSection
} from "@/components/Styles_pages/StyleCommun";

import { useState, useMemo } from "react";
import { icons } from "@/public/icons/Icons";
import {
  HeaderRow,
  SearchInput,
  TableContainer,
  Table,
  Th,
  Td,
  StatusButton,
  ActionButton,
  EmptyState,
  Container,
  FilterGroup,
  FilterButton,
  ResultCount,
  CardsContainer,
  StationCard,
  CardHeader,
  CardTitle,
  CardRow,
  CardLabel,
  CardValue,
  CardActions,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationButton,
  PageSizeSelect,
  LockedBadge,
} from "@/components/Styles_pages/StationStyles";

const initialStations = [
  { id: 1, name: "Station Total Hamdallaye", manager: "Ali Traoré", phone: "+223 70 00 00 01", commune: "Bamako", status: "En attente" },
  { id: 2, name: "Station Shell Sikasso", manager: "Fatoumata Diarra", phone: "+223 70 00 00 02", commune: "Sikasso", status: "Approuvé" },
  { id: 3, name: "Station Oryx Kayes", manager: "Ibrahim Keita", phone: "+223 70 00 00 03", commune: "Kayes", status: "Rejeté" },
  { id: 4, name: "Station Libya Oil Mopti", manager: "Awa Coulibaly", phone: "+223 70 00 00 04", commune: "Mopti", status: "En attente" },
  { id: 5, name: "Station Pétro Ségou", manager: "Moussa Sangaré", phone: "+223 70 00 00 05", commune: "Ségou", status: "Approuvé" },
  { id: 6, name: "Station Total Tombouctou", manager: "Aminata Touré", phone: "+223 70 00 00 06", commune: "Tombouctou", status: "Désactivé" },
  { id: 7, name: "Station Petroci Gao", manager: "Seydou Camara", phone: "+223 70 00 00 07", commune: "Gao", status: "Approuvé" },
  { id: 8, name: "Station Total Koulikoro", manager: "Mariam Koné", phone: "+223 70 00 00 08", commune: "Koulikoro", status: "En attente" },
  { id: 9, name: "Station Shell Kidal", manager: "Abdoulaye Maiga", phone: "+223 70 00 00 09", commune: "Kidal", status: "Rejeté" },
  { id: 10, name: "Station Oryx Koutiala", manager: "Bintou Sidibé", phone: "+223 70 00 00 10", commune: "Koutiala", status: "Approuvé" },
  { id: 11, name: "Station Libya Markala", manager: "Youssouf Dembélé", phone: "+223 70 00 00 11", commune: "Markala", status: "En attente" },
  { id: 12, name: "Station Total San", manager: "Aissata Cissé", phone: "+223 70 00 00 12", commune: "San", status: "Désactivé" },
];

function nextStatus(current) {
  const cycle = {
    "En attente": "Approuvé",
    "Approuvé": "Désactivé",
    "Désactivé": "Approuvé",
  };
  return cycle[current] || current; // Ne change pas si Rejeté
}

const statusOptions = [
  { value: "all", label: "Tous" },
  { value: "En attente", label: "En attente" },
  { value: "Approuvé", label: "Approuvé" },
  { value: "Rejeté", label: "Rejeté" },
  { value: "Désactivé", label: "Désactivé" },
];

export default function StationsPage() {
  const [stations, setStations] = useState(initialStations);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtrage
  const filtered = useMemo(() => {
    return stations.filter((s) => {
      const matchesQuery = [s.name, s.manager, s.phone, s.commune]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus = statusFilter === "all" ? true : s.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [stations, query, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStations = filtered.slice(startIndex, endIndex);

  // Reset à la page 1 quand on filtre
  useMemo(() => {
    setCurrentPage(1);
  }, [query, statusFilter, pageSize]);

  const toggleStatus = (id, currentStatus) => {
    // Empêche le changement si le statut est "Rejeté"
    if (currentStatus === "Rejeté") {
      alert("Les stations rejetées ne peuvent pas changer de statut.");
      return;
    }

    setStations((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nextStatus(s.status) } : s))
    );
  };

  const handleViewDetails = (station) => {
    alert(`Détails de ${station.name}\n\nGérant: ${station.manager}\nCommune: ${station.commune}\nTéléphone: ${station.phone}\nStatut: ${station.status}`);
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
        <WelcomeTitle>Stations, sous contrôle</WelcomeTitle>
        <WelcomeSubtitle>
          Suivez leur activité, détectez les anomalies et gardez une vision claire du terrain.
        </WelcomeSubtitle>
      </WelcomeSection>

      <SectionTitle>Gestion des Stations</SectionTitle>
      
      <BigContainerUneSection>
        <Container>
          <HeaderRow>
            {/* Filtres de statut */}
            <FilterGroup>
              {statusOptions.map((option) => (
                <FilterButton
                  key={option.value}
                  active={statusFilter === option.value}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </FilterButton>
              ))}
            </FilterGroup>

            {/* Champ de recherche */}
            <SearchInput
              placeholder="Rechercher une station..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </HeaderRow>

          {/* Nombre de résultats */}
          <ResultCount>
            <strong>{filtered.length}</strong> station{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
            {filtered.length > 0 && ` (page ${currentPage} sur ${totalPages})`}
          </ResultCount>

          {filtered.length === 0 ? (
            <EmptyState>
              {query ? 
                `Aucune station ne correspond à "${query}"` : 
                "Aucune station trouvée avec ce filtre."}
            </EmptyState>
          ) : (
            <>
              {/* AFFICHAGE MOBILE - CARTES */}
              <CardsContainer>
                {paginatedStations.map((s) => (
                  <StationCard key={s.id}>
                    <CardHeader>
                      <CardTitle>{s.name}</CardTitle>
                      <StatusButton 
                        status={s.status} 
                        disabled={s.status === "Rejeté"}
                        onClick={() => toggleStatus(s.id, s.status)}
                      >
                        {s.status}
                        {s.status === "Rejeté" && icons.cadenas}
                      </StatusButton>
                    </CardHeader>
                    
                    <CardRow>
                      <CardLabel>{icons.usagers} Gérant</CardLabel>
                      <CardValue>{s.manager}</CardValue>
                    </CardRow>
                    
                    <CardRow>
                      <CardLabel>{icons.localisation} Commune</CardLabel>
                      <CardValue>{s.commune}</CardValue>
                    </CardRow>
                    
                    <CardRow>
                      <CardLabel>{icons.phone} Téléphone</CardLabel>
                      <CardValue>{s.phone}</CardValue>
                    </CardRow>

                    <CardActions>
                      <ActionButton variant="primary" onClick={() => handleViewDetails(s)}>
                        Voir détails
                      </ActionButton>
                      {s.status !== "Rejeté" && (
                        <ActionButton onClick={() => toggleStatus(s.id, s.status)}>
                          Changer statut
                        </ActionButton>
                      )}
                    </CardActions>
                  </StationCard>
                ))}
              </CardsContainer>

              {/* AFFICHAGE DESKTOP - TABLEAU */}
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <Th>Nom</Th>
                      <Th>Gérant</Th>
                      <Th>Commune</Th>
                      <Th>Téléphone</Th>
                      <Th style={{ width: 160 }}>Statut</Th>
                      <Th style={{ width: 100 }}>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStations.map((s) => (
                      <tr key={s.id}>
                        <Td><strong>{s.name}</strong></Td>
                        <Td>{s.manager}</Td>
                        <Td>{s.commune}</Td>
                        <Td>{s.phone}</Td>
                        <Td>
                          <StatusButton 
                            status={s.status}
                            disabled={s.status === "Rejeté"}
                            onClick={() => toggleStatus(s.id, s.status)}
                            title={s.status === "Rejeté" ? "Statut verrouillé" : "Cliquer pour changer"}
                          >
                            {s.status}
                            {s.status === "Rejeté" && icons.cadenas}
                          </StatusButton>
                        </Td>
                        <Td>
                          <ActionButton onClick={() => handleViewDetails(s)}>
                            Détails
                          </ActionButton>
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
                      <option value={10}>10 par page</option>
                      <option value={20}>20 par page</option>
                      <option value={50}>50 par page</option>
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