import { API_BASE_URL } from './config';

/**
 * Service pour les appels API Usager (sans authentification)
 */
class UsagerService {
  
  /**
   * Récupère la liste des stations avec filtres
   * @param {Object} filters - Filtres (search, fuel, status, sort, order)
   */
  async getStations(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const url = `${API_BASE_URL}/api/public/stations${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des stations');
    }

    return await response.json();
  }

  /**
   * Récupère les détails d'une station
   * @param {number} stationId 
   */
  async getStationDetails(stationId) {
    const response = await fetch(`${API_BASE_URL}/api/public/stations/${stationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la station');
    }

    return await response.json();
  }

  /**
   * Envoie un signalement pour une station
   * @param {number} stationId 
   * @param {string} type - Type de signalement (incident, erreur, autre)
   * @param {string} message - Message du signalement
   */
  async sendReport(stationId, type, message) {
    const response = await fetch(`${API_BASE_URL}/api/public/stations/${stationId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        type,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'envoi du signalement');
    }

    return await response.json();
  }

  /**
   * Récupère les types de carburant disponibles
   */
  async getFuelTypes() {
    const response = await fetch(`${API_BASE_URL}/api/fuel-types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des types de carburant');
    }

    return await response.json();
  }
}

// Export d'une instance unique (singleton)
export default new UsagerService();