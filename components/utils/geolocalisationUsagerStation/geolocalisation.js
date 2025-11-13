
/**
 * Calcule la distance entre deux points GPS (formule de Haversine)
 * @param {number} lat1 - Latitude du point 1
 * @param {number} lon1 - Longitude du point 1
 * @param {number} lat2 - Latitude du point 2
 * @param {number} lon2 - Longitude du point 2
 * @returns {number} Distance en kilomètres
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Convertit des degrés en radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Formate la distance pour l'affichage
 * @param {number} distance - Distance en kilomètres
 * @returns {string} Distance formatée (ex: "1.2 km" ou "850 m")
 */
export function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
}

/**
 * Récupère la position actuelle de l'utilisateur
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("La géolocalisation n'est pas supportée par votre navigateur"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = "Erreur de géolocalisation";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Veuillez autoriser l'accès à votre position pour voir les distances";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Position indisponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Délai de géolocalisation dépassé";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // Cache de 0 minute
      }
    );
  });
}

/**
 * Stocke la position de l'utilisateur dans localStorage
 */
export function saveUserLocation(latitude, longitude) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude, timestamp: Date.now() }));
  }
}

/**
 * Récupère la position stockée de l'utilisateur
 * @returns {{latitude: number, longitude: number} | null}
 */
export function getSavedUserLocation() {
  if (typeof window === 'undefined') return null;
  
  const saved = localStorage.getItem('userLocation');
  if (!saved) return null;
  
  try {
    const data = JSON.parse(saved);
    // Vérifier si la position a moins de 30 minutes
    const maxAge = 30 * 60 * 1000; // 30 minutes
    if (Date.now() - data.timestamp > maxAge) {
      localStorage.removeItem('userLocation');
      return null;
    }
    return { latitude: data.latitude, longitude: data.longitude };
  } catch {
    return null;
  }
}