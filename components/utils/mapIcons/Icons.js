import L from "leaflet";

export const getMarkerIcon = (status) => {
  let colorUrl;

  switch (status) {
    case "approved":
      colorUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
      break;
    case "pending":
      colorUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png";
      break;
    case "rejected":
      colorUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
      break;
    default:
      colorUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
  }

  return new L.Icon({
    iconUrl: colorUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
};
