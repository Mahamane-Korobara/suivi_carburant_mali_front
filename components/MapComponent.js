"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import adminService from "@/pages/api/adminService";
import { getMarkerIcon } from "@/components/utils/mapIcons/Icons";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent() {
  const [maliBorder, setMaliBorder] = useState(null);
  const [stations, setStations] = useState([]);
  const centerMali = [13.5, -5.5];
  const MAPTILER_KEY = "wf0Vjham1vmydQwuoZGO";

  // Charger le contour du Mali
  useEffect(() => {
    fetch("/data/mali.geojson")
      .then((res) => res.json())
      .then((data) => setMaliBorder(data))
      .catch((err) => console.error("Erreur chargement Mali:", err));
  }, []);

  // Récupérer les stations depuis l'API
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await adminService.getStations();
        setStations(data);
      } catch (err) {
        console.error("Erreur récupération stations :", err);
      }
    };
    fetchStations();
  }, []); // vide = s'exécute une seule fois au montage

  const statusFrench = {
  approved: "Approuvé",
  pending: "En attente",
  rejected: "Rejeté",
};


  return (
    <MapContainer
      center={centerMali}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "calc(100vh - 100px)", width: "100%", borderRadius: "12px" }}
      maxBounds={[[25, -12], [10, 5]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`}
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>, &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {maliBorder && (
        <GeoJSON
          data={maliBorder}
          style={{ color: "green", weight: 2, opacity: 0.8, fill: false }}
        />
      )}

     {stations
      .filter(station => station.latitude != null && station.longitude != null)
      .map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={getMarkerIcon(station.status)}
        >
          <Popup>
            <strong>{station.name}</strong> <br />
            {station.commune} <br />
            Gérant : {station.gerant_name} <br />
            Téléphone : {station.phone} <br />
            Statut :{" "}
            <span
              style={{
                color:
                  station.status === "approved"
                    ? "green"
                    : station.status === "pending"
                    ? "orange"
                    : station.status === "rejected"
                    ? "red"
                    : "gray",
                fontWeight: "bold",
              }}
            >
              {statusFrench[station.status] || station.status}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
