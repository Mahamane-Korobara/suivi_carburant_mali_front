import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import adminService from "@/pages/api/adminService";
import { icons } from "@/components/utils/icons/Icons";
import useAdminAuth from "@/hooks/useAdminAuth";
import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  BigContainerUneSection,
  BtnError
} from "@/components/Styles_pages/StyleCommun";
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
} from "@/components/Styles_pages/adminStyles/StationStyles";

// Mapping des statuts Laravel vers l'affichage
const statusMapping = {
  pending: "En attente",
  approved: "Approuvé",
  rejected: "Rejeté",
};

const statusOptions = [
  { value: "all", label: "Tous" },
  { value: "pending", label: "En attente" },
  { value: "approved", label: "Approuvé" },
  { value: "rejected", label: "Rejeté" },
];

export default function StationsPage() {
  const router = useRouter();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Charger les stations depuis l'API
  const loadStations = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await adminService.getStations();
      
      // Transformer les données pour correspondre à votre structure
      const transformedStations = data.map((station) => ({
        id: station.id,
        name: station.name,
        manager: station.gerant_name || "Non défini",
        phone: station.phone || "Non défini",
        email: station.email || "",
        commune: station.commune,
        quartier: station.quartier || "",
        address: station.address || "",
        latitude: station.latitude,
        longitude: station.longitude,
        status: station.status, // pending, approved, rejected
        fuelStatuses: station.fuel_statuses || [],
        updatedAt: station.updated_at,
      }));

      setStations(transformedStations);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
      
      if (err.message.includes("401") || err.message.includes("Unauthorized")) {
        localStorage.clear();
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  // Charger les stations au montage
  useAdminAuth(loadStations);

  // Filtrage local
  const filtered = useMemo(() => {
    return stations.filter((s) => {
      const matchesQuery = [s.name, s.manager, s.phone, s.commune, s.quartier]
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

  // Approuver une station
  const handleApprove = async (stationId) => {
    if (!confirm("Êtes-vous sûr de vouloir approuver cette station ?")) {
      return;
    }

    try {
      await adminService.approveStation(stationId);
      alert("Station approuvée avec succès !");
      loadStations(); // Recharger la liste
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // Rejeter une station
  const handleReject = async (stationId) => {
    const reason = prompt("Raison du rejet:");
    
    if (!reason) return;

    try {
      await adminService.rejectStation(stationId, reason);
      alert("Station rejetée avec succès !");
      loadStations();
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // Désactiver une station
  const handleDisable = async (stationId) => {
    if (!confirm("Êtes-vous sûr de vouloir désactiver cette station ?")) {
      return;
    }

    try {
      await adminService.disableStation(stationId);
      alert("Station désactivée avec succès !");
      loadStations();
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // Réactiver une station
  const handleReactivate = async (stationId) => {
    if (!confirm("Êtes-vous sûr de vouloir réactiver cette station ?")) {
      return;
    }

    try {
      await adminService.reactivateStation(stationId);
      alert("Station réactivée avec succès !");
      loadStations();
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // Voir les détails avec historique
const handleViewDetails = async (station) => {
  try {
    // Récupération de l’historique
    const history = await adminService.getStationHistory(station.id);

    // Fonction pour formater les dates
    const formatDate = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };

    // Construction du texte d'historique
    let historyText = "\n\n--- Historique ---\n";
    history.history.forEach((h) => {
      historyText += `\n${formatDate(h.created_at)}: ${h.status}`;
    });

    // Construction du texte principal avec toutes les infos utiles
    let details = `
      Détails de la station : ${station.name}

      Gérant : ${station.manager}
      Email : ${station.email || "Non défini"}
      Téléphone : ${station.phone || "Non défini"}

      Adresse : ${station.address || "Non précisée"}
      Quartier : ${station.quartier || "Non défini"}
      Commune : ${station.commune || "Non définie"}

      Statut : ${statusMapping[station.status] || station.status}
      ${historyText}
          `;

    // Ajout des statuts carburants
    if (station.fuelStatuses?.length) {
      details += "\n\n--- Statuts des carburants ---\n";
      station.fuelStatuses.forEach((fuel) => {
        details += `${fuel.fuel_type}: ${fuel.status}\n`;
      });
    }

    alert(details);

  } catch (err) {
    // Si l’historique n’est pas dispo, afficher les infos sans
    const details = `
      Détails de la station : ${station.name}

      Gérant : ${station.manager}
      Email : ${station.email || "Non défini"}
      Téléphone : ${station.phone || "Non défini"}

      Adresse : ${station.address || "Non précisée"}
      Quartier : ${station.quartier || "Non défini"}
      Commune : ${station.commune || "Non définie"}

      Latitude : ${station.latitude ?? "Non définie"}
      Longitude : ${station.longitude ?? "Non définie"}

      Statut : ${statusMapping[station.status] || station.status}

      Historique non disponible.
          `;

    alert(details);
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

  // Affichage pendant le chargement
  if (loading) {
    return (
      <>
        <WelcomeSection>
          <WelcomeTitle>Stations, sous contrôle</WelcomeTitle>
          <WelcomeSubtitle>Chargement des données...</WelcomeSubtitle>
        </WelcomeSection>
      </>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <>
        <WelcomeSection>
          <WelcomeTitle>Stations, sous contrôle</WelcomeTitle>
          <WelcomeSubtitle style={{ color: "red" }}>
            Erreur : {error}
          </WelcomeSubtitle>
        </WelcomeSection>
        <BigContainerUneSection>
          <BtnError
            onClick={loadStations}
          >
            Réessayer
          </BtnError>
        </BigContainerUneSection>
      </>
    );
  }

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
                      <StatusButton status={statusMapping[s.status]}>
                        {statusMapping[s.status]}
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
                      
                      {s.status === "pending" && (
                        <>
                          <ActionButton onClick={() => handleApprove(s.id)}>
                            Approuver
                          </ActionButton>
                          <ActionButton onClick={() => handleReject(s.id)}>
                            Rejeter
                          </ActionButton>
                        </>
                      )}
                      
                      {s.status === "approved" && (
                        <ActionButton onClick={() => handleDisable(s.id)}>
                          Désactiver
                        </ActionButton>
                      )}
                      
                      {s.status === "rejected" && (
                        <ActionButton onClick={() => handleReactivate(s.id)}>
                          Réactiver
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
                      <Th style={{ width: 200 }}>Actions</Th>
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
                          <StatusButton status={statusMapping[s.status]}>
                            {statusMapping[s.status]}
                          </StatusButton>
                        </Td>
                        <Td>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            <ActionButton onClick={() => handleViewDetails(s)}>
                              Détails
                            </ActionButton>
                            
                            {s.status === "pending" && (
                              <>
                                <ActionButton onClick={() => handleApprove(s.id)}>
                                  Approuver
                                </ActionButton>
                                <ActionButton onClick={() => handleReject(s.id)}>
                                  Rejeter
                                </ActionButton>
                              </>
                            )}
                            
                            {s.status === "approved" && (
                              <ActionButton onClick={() => handleDisable(s.id)}>
                                Désactiver
                              </ActionButton>
                            )}
                            
                            {s.status === "rejected" && (
                              <ActionButton onClick={() => handleReactivate(s.id)}>
                                Réactiver
                              </ActionButton>
                            )}
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