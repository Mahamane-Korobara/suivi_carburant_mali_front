// Ce fichier “isole” Leaflet pour éviter les erreurs côté serveur (window is not defined)
"use client";

import dynamic from "next/dynamic";

// On importe la vraie carte (sans SSR)
const Map = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function MapView() {
  return <Map />;
}
