"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { stations } from "@/public/data/stationsData";

// Icône personnalisée
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent() {
  const [maliBorder, setMaliBorder] = useState(null);
  const centerMali = [13.5, -5.5];

  // Ta clé MapTiler
  const MAPTILER_KEY = "wf0Vjham1vmydQwuoZGO";

  // Charger le contour du Mali
  useEffect(() => {
    fetch("/data/mali.geojson")
      .then((res) => res.json())
      .then((data) => setMaliBorder(data))
      .catch((err) => console.error("Erreur chargement Mali:", err));
  }, []);

  return (
    <MapContainer
      center={centerMali}
      zoom={5}
      scrollWheelZoom={true}
      style={{
        height: "calc(100vh - 100px)",
        width: "100%",
        borderRadius: "12px",
      }}
      maxBounds={[[25, -12], [10, 5]]}
      maxBoundsViscosity={1.0}
    >
      {/* Fond satellite MapTiler */}
      <TileLayer
        url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`}
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>, &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* Contour du Mali */}
      {maliBorder && (
        <GeoJSON
          data={maliBorder}
          style={{
            color: "green",
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
