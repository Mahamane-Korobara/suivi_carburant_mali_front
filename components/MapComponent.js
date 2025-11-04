"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Icône personnalisée (pour Next.js)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Données fictives : stations du Mali
const stations = [
  { id: 1, name: "Station Total Hamdallaye", manager: "Ali Traoré", phone: "+223 70 00 00 01", commune: "Bamako", status: "En attente", latitude: 12.6392, longitude: -8.0029 },
  { id: 2, name: "Station Shell Sikasso", manager: "Fatoumata Diarra", phone: "+223 70 00 00 02", commune: "Sikasso", status: "Approuvé", latitude: 11.3175, longitude: -5.6665 },
  { id: 3, name: "Station Oryx Kayes", manager: "Ibrahim Keita", phone: "+223 70 00 00 03", commune: "Kayes", status: "Rejeté", latitude: 14.4469, longitude: -11.4445 },
  { id: 4, name: "Station Libya Oil Mopti", manager: "Awa Coulibaly", phone: "+223 70 00 00 04", commune: "Mopti", status: "En attente", latitude: 14.4843, longitude: -4.1828 },
  { id: 5, name: "Station Pétro Ségou", manager: "Moussa Sangaré", phone: "+223 70 00 00 05", commune: "Ségou", status: "Approuvé", latitude: 13.4317, longitude: -6.2157 },
  { id: 6, name: "Station Total Tombouctou", manager: "Aminata Touré", phone: "+223 70 00 00 06", commune: "Tombouctou", status: "Désactivé", latitude: 16.7735, longitude: -3.0074 },
  { id: 7, name: "Station Petroci Gao", manager: "Seydou Camara", phone: "+223 70 00 00 07", commune: "Gao", status: "Approuvé", latitude: 16.2667, longitude: -0.05 },
  { id: 8, name: "Station Total Koulikoro", manager: "Mariam Koné", phone: "+223 70 00 00 08", commune: "Koulikoro", status: "En attente", latitude: 12.8628, longitude: -7.5599 },
  { id: 9, name: "Station Shell Kidal", manager: "Abdoulaye Maiga", phone: "+223 70 00 00 09", commune: "Kidal", status: "Rejeté", latitude: 18.4411, longitude: 1.4078 },
  { id: 10, name: "Station Oryx Koutiala", manager: "Bintou Sidibé", phone: "+223 70 00 00 10", commune: "Koutiala", status: "Approuvé", latitude: 12.3925, longitude: -5.464 },
  { id: 11, name: "Station Libya Markala", manager: "Youssouf Dembélé", phone: "+223 70 00 00 11", commune: "Markala", status: "En attente", latitude: 13.6782, longitude: -6.0667 },
  { id: 12, name: "Station Total San", manager: "Aissata Cissé", phone: "+223 70 00 00 12", commune: "San", status: "Désactivé", latitude: 13.3239, longitude: -4.8957 },
];

export default function MapComponent() {
  const [maliBorder, setMaliBorder] = useState(null);
  const centerMali = [13.5, -5.5];

  // Charger le contour du Mali (fichier GeoJSON)
  useEffect(() => {
    fetch("/data/mali.geojson")
      .then((res) => res.json())
      .then((data) => setMaliBorder(data))
      .catch((err) => console.error("Erreur chargement Mali:", err));
  }, []);

  return (
    <MapContainer
      center={centerMali}
      zoom={6}
      scrollWheelZoom={true}
      style={{
        height: "calc(100vh - 100px)",
        width: "100%",
        borderRadius: "12px",
      }}
      maxBounds={[[25, -12], [10, 5]]}
      maxBoundsViscosity={1.0}
    >
      {/* Fond satellite */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics'
      />

      {/* Contour du Mali */}
      {maliBorder && (
        <GeoJSON
          data={maliBorder}
          style={{
            color: "yellow",
            weight: 2,
            opacity: 0.8,
            fill: false,
          }}
        />
      )}

      {/* Marqueurs dynamiques */}
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <strong>{station.name}</strong> <br />
            {station.commune} <br />
            Gérant : {station.manager} <br />
            Téléphone : {station.phone} <br />
            Statut :{" "}
            <span
              style={{
                color:
                  station.status === "Approuvé"
                    ? "green"
                    : station.status === "En attente"
                    ? "orange"
                    : station.status === "Rejeté"
                    ? "red"
                    : "gray",
                fontWeight: "bold",
              }}
            >
              {station.status}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
