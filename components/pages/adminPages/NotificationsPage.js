import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import adminService from "@/pages/api/adminService";
import { Bell, BellOff, Check } from "lucide-react";
import {
  SectionTitle,
  BigContainerUneSection,
  BigContainer,
  BtnError,
} from "@/components/Styles_pages/StyleCommun";
import {
  NotificationCard,
  NotificationHeader,
  NotificationTitle,
  NotificationBadge,
  NotificationMessage,
  NotificationDate,
  NotificationActions,
  ActionButton,
  EmptyState,
  FilterContainer,
} from "@/components/Styles_pages/adminStyles/NotificationStyles";
import { FilterButton } from "@/components/Styles_pages/adminStyles/StationStyles";
import {  StatCard, StatValue, StatTitle } from '@/components/Styles_pages/adminStyles/DashboardStyles'
import PageHeader from "@/components/adminPageHeader";

// Fonction pour formater la date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token || userType !== "admin") {
      router.push("/");
      return;
    }

    loadNotifications();
  }, [router]);

  // Charger les notifications
  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminService.getNotifications();
      
      console.log("🔍 Notifications reçues:", response);

      setNotifications(response.data || []);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
      
      if (err.message.includes("401") || err.message.includes("Unauthorized")) {
        localStorage.clear();
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  // Marquer une notification comme lue
  const handleMarkAsRead = async (notificationId) => {
    try {
      await adminService.markNotificationAsRead(notificationId);
      
      // Mettre à jour localement
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // Marquer toutes comme lues
  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.is_read);
    
    try {
      await Promise.all(
        unreadNotifications.map(n => adminService.markNotificationAsRead(n.id))
      );
      
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, is_read: true }))
      );
      
      alert("Toutes les notifications ont été marquées comme lues !");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // Filtrage
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.is_read;
    if (filter === 'read') return notif.is_read;
    return true;
  });

  // Statistiques
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.is_read).length,
    read: notifications.filter(n => n.is_read).length,
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <>
        <PageHeader
          title="Notifications"
          subtitle="Restez informé des événements importants"
          sectionTitle="Centre de notifications"
        />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Chargement des notifications...</p>
        </div>
      </>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <>
        <PageHeader
          title="Notifications"
          subtitle="Restez informé des événements importants"
          sectionTitle="Centre de notifications"
        />
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          <p>Erreur : {error}</p>
          <BtnError onClick={loadNotifications}>
            Réessayer
          </BtnError>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Restez informé des événements importants de votre plateforme"
        sectionTitle="Centre de notifications"
      />

      {/* Statistiques */}
      <BigContainer>
        <StatCard>
          <StatTitle>Total</StatTitle>
          <StatValue>{stats.total}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Non lues</StatTitle>
          <StatValue style={{ color: '#007bff' }}>{stats.unread}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Lues</StatTitle>
          <StatValue style={{ color: '#6c757d' }}>{stats.read}</StatValue>
        </StatCard>
      </BigContainer>

      <BigContainerUneSection>
        {/* Filtres */}
        <FilterContainer>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Toutes ({stats.total})
          </FilterButton>
          <FilterButton
            active={filter === 'unread'}
            onClick={() => setFilter('unread')}
          >
            Non lues ({stats.unread})
          </FilterButton>
          <FilterButton
            active={filter === 'read'}
            onClick={() => setFilter('read')}
          >
            Lues ({stats.read})
          </FilterButton>

          {stats.unread > 0 && (
            <ActionButton
              variant="success"
              onClick={handleMarkAllAsRead}
              style={{ marginLeft: 'auto' }}
            >
              <Check size={16} style={{ marginRight: '0.25rem' }} />
              Tout marquer comme lu
            </ActionButton>
          )}
        </FilterContainer>

        {/* Liste des notifications */}
        {filteredNotifications.length === 0 ? (
          <EmptyState>
            {filter === 'unread' ? <BellOff /> : <Bell />}
            <div>
              {filter === 'unread' 
                ? "Aucune notification non lue" 
                : filter === 'read'
                ? "Aucune notification lue"
                : "Aucune notification"}
            </div>
          </EmptyState>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              isRead={notification.is_read}
              onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
            >
              <NotificationHeader>
                <NotificationTitle isRead={notification.is_read}>
                  {notification.title}
                </NotificationTitle>
                <NotificationBadge isRead={notification.is_read}>
                  {notification.is_read ? 'Lue' : 'Nouvelle'}
                </NotificationBadge>
              </NotificationHeader>

              <NotificationMessage isRead={notification.is_read}>
                {notification.message}
              </NotificationMessage>

              <NotificationDate>
                {formatDate(notification.created_at)}
              </NotificationDate>

              {!notification.is_read && (
                <NotificationActions>
                  <ActionButton
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    <Check size={16} style={{ marginRight: '0.25rem' }} />
                    Marquer comme lue
                  </ActionButton>
                </NotificationActions>
              )}
            </NotificationCard>
          ))
        )}
      </BigContainerUneSection>
    </>
  );
}