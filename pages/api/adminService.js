// lib/api/adminService.js
import { API_BASE_URL, getAuthHeaders } from './config';

/**
 * Service pour les appels API Admin
 */
class AdminService {
  
  /**
   * Récupère les statistiques du dashboard
   */
  async getStats() {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des statistiques');
    }

    return await response.json();
  }

  /**
   * Récupère les statistiques de carburant
   */
  async getFuelStats() {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/fuel-stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des stats carburant');
    }

    return await response.json();
  }

  /**
   * Récupère la liste des stations avec filtres optionnels
   * @param {Object} filters - Filtres (commune, status, search, etc.)
   */
  async getStations(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const url = `${API_BASE_URL}/api/admin/stations${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des stations');
    }

    return await response.json();
  }

  /**
   * Récupère l'historique d'une station
   * @param {number} stationId 
   */
  async getStationHistory(stationId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/${stationId}/history`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'historique');
    }

    return await response.json();
  }

  /**
   * Approuve une station
   * @param {number} stationId 
   */
  async approveStation(stationId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/${stationId}/approve`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'approbation');
    }

    return await response.json();
  }

  /**
   * Rejette une station
   * @param {number} stationId 
   * @param {string} reason 
   */
  async rejectStation(stationId, reason) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/${stationId}/reject`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors du rejet');
    }

    return await response.json();
  }

  /**
   * Désactive une station
   * @param {number} stationId 
   */
  async disableStation(stationId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/${stationId}/disable`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la désactivation');
    }

    return await response.json();
  }

  /**
   * Réactive une station
   * @param {number} stationId 
   */
  async reactivateStation(stationId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/${stationId}/reactivate`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la réactivation');
    }

    return await response.json();
  }

  /**
   * Déconnexion admin
   */
  async logout() {
    const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion');
    }

    return await response.json();
  }

  // ==================== SIGNALEMENTS ====================

  /**
   * Récupère la liste des signalements avec filtres
   * @param {Object} filters - Filtres (search, page, etc.)
   */
  async getReports(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const url = `${API_BASE_URL}/api/admin/stations/reports${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des signalements');
    }

    return await response.json();
  }

  /**
   * Récupère les détails d'un signalement
   * @param {number} reportId 
   */
  async getReportDetails(reportId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/reports/${reportId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du signalement');
    }

    return await response.json();
  }

  /**
   * Supprime un signalement
   * @param {number} reportId 
   */
  async deleteReport(reportId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/reports/${reportId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la suppression');
    }

    return await response.json();
  }

  // ==================== NOTIFICATIONS ====================

  /**
   * Récupère toutes les notifications
   */
  async getNotifications() {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/notifications`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des notifications');
    }

    return await response.json();
  }

  /**
   * Marque une notification comme lue
   * @param {number} notificationId 
   */
  async markNotificationAsRead(notificationId) {
    const response = await fetch(`${API_BASE_URL}/api/admin/stations/notifications/${notificationId}/read`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  }
}

// Export d'une instance unique (singleton)
export default new AdminService();