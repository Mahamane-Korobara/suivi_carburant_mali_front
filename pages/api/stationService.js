import { API_BASE_URL, getAuthHeaders } from '@/pages/api/config';

/**
 * Service pour les appels API Station
 */
class StationService {
  
  /**
   * Récupère les types de carburant disponibles avec leurs statuts
   */
  async getFuelStatuses() {
    const response = await fetch(`${API_BASE_URL}/api/stations/fuel-statuses`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des statuts');
    }

    return await response.json();
  }

  /**
   * Met à jour le statut d'un type de carburant
   * @param {number} fuelTypeId - ID du type de carburant
   * @param {string} status - Nouveau statut (disponible, peu, rupture)
   */
  async updateFuelStatus(fuelTypeId, status) {
    const response = await fetch(`${API_BASE_URL}/api/stations/status-change`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        fuel_type_id: fuelTypeId,
        status: status,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  }

  /**
   * Récupère l'historique des changements de statut (dernière semaine)
   */
  async getFuelHistory() {
    const response = await fetch(`${API_BASE_URL}/api/stations/fuel-history`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'historique');
    }

    return await response.json();
  }

  /**
   * Déconnexion station
   */
  async logout() {
    const response = await fetch(`${API_BASE_URL}/api/stations/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion');
    }

    return await response.json();
  }
}

// Export d'une instance unique (singleton)
export default new StationService();