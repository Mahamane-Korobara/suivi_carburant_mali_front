
import {
  BigContainer,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
} from "@/components/Styles_pages/StyleCommun";

import { useState, useMemo } from "react";
import {
  HeaderRow,
  SearchInput,
  TableContainer,
  Table,
  Th,
  Td,
  StatusButton,
  ActionGroup,
  EmptyState,
  Container,
} from "@/components/Styles_pages/StationStyles";

const initialStations = [
  { id: 1, name: "Station A", manager: "Ali", phone: "+223 70 00 00 01", commune: "Bamako", status: "En attente" },
  { id: 2, name: "Station B", manager: "Fatoumata", phone: "+223 70 00 00 02", commune: "Sikasso", status: "Approuvé" },
  { id: 3, name: "Station C", manager: "Ibrahim", phone: "+223 70 00 00 03", commune: "Kayes", status: "Rejeté" },
  { id: 4, name: "Station D", manager: "Awa", phone: "+223 70 00 00 04", commune: "Mopti", status: "En attente" },
];

function nextStatus(current) {
  if (current === "En attente") return "Approuvé";
  if (current === "Approuvé") return "Désactivé";
  if (current === "Désactivé") return "Approuvé";
  return "En attente";
}

export default function StationsPage() {
  const [stations, setStations] = useState(initialStations);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const toggleStatus = (id) => {
    setStations((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nextStatus(s.status) } : s))
    );
  };

  return (
    <>
      <WelcomeSection>
        <WelcomeTitle>Stations, sous contrôle</WelcomeTitle>
        <WelcomeSubtitle>Suivez leur activité, détectez les anomalies et gardez une vision claire du terrain.</WelcomeSubtitle>
      </WelcomeSection>

      <SectionTitle>Stations</SectionTitle>
      <BigContainer>
        <Container>
          <HeaderRow>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {["all", "En attente", "Approuvé", "Rejeté", "Désactivé"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: statusFilter === status ? "1px solid #f7b32b" : "1px solid #e6e9ef",
                    background: statusFilter === status ? "#f7b32b" : "white",
                    color: statusFilter === status ? "white" : "#333",
                    fontWeight: statusFilter === status ? "600" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: statusFilter === status ? "0 2px 6px rgba(247, 179, 43, 0.3)" : "none",
                  }}
                >
                  {status === "all"
                    ? "Tous"
                    : status === "En attente"
                      ? "En attente"
                      : status === "Approuvé"
                        ? "Approuvé"
                        : status === "Désactivé"
                          ? "Désactivé"
                          : "Rejeté"}
                </button>
              ))}
            </div>

            {/* Champ de recherche */}
            <SearchInput
              placeholder="Rechercher par nom, gérant, commune ou téléphone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </HeaderRow>

          <TableContainer>
            {filtered.length === 0 ? (
              <EmptyState>Aucune station trouvée.</EmptyState>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Nom</Th>
                    <Th>Gérant</Th>
                    <Th>Commune</Th>
                    <Th>Téléphone</Th>
                    <Th style={{ width: 160 }}>Statut</Th>
                    <Th style={{ width: 120 }}>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <Td>{s.name}</Td>
                      <Td>{s.manager}</Td>
                      <Td>{s.commune}</Td>
                      <Td>{s.phone}</Td>
                      <Td>
                        <StatusButton status={s.status} onClick={() => toggleStatus(s.id)}>
                          {s.status}
                        </StatusButton>
                      </Td>
                      <Td>
                        <ActionGroup>
                          <button
                            onClick={() => alert(`Voir la station ${s.name}`)}
                            style={{ padding: 8, borderRadius: 8, border: "1px solid #e6e9ef", background: "white", cursor: "pointer" }}
                          >
                            Détails
                          </button>
                        </ActionGroup>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </TableContainer>
        </Container>
      </BigContainer>
    </>

  );
}