export const API_BASE_URL = "http://localhost:8000";

/**
 * Récupère le token d'authentification
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Headers pour les requêtes authentifiées
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Ajouter le token si disponible
  };
};

/**
 * Gestion centralisée des erreurs API
 */
export const handleApiError = (error, customMessage = "Une erreur est survenue") => {
  console.error("Erreur API:", error);
  
  if (error.response) {
    // Erreur avec réponse du serveur
    return error.response.data?.message || customMessage;
  } else if (error.request) {
    // Requête envoyée mais pas de réponse
    return "Impossible de contacter le serveur";
  } else {
    // Erreur lors de la configuration de la requête
    return customMessage;
  }
};