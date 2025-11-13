import {
  Fuel,
  MapPin,
  Users,
  Gauge,
  AlertTriangle,
  Settings,
  Home,
  LogOut,
  Bell,
  ClipboardList,
  Map,
  Phone,
  Lock,
  Clock,
  Trash,
  ArrowLeft,
  LogIn,
  Flag
} from "lucide-react";

// Dictionnaire centralisé des icônes de l’app KARBU
export const icons = {
  // Pages principales
  dashboard: <Home size={20} color="#0ea5e9" />,        // Bleu clair
  stations: <Fuel size={20} color="#10b981" />,         // Vert carburant
  carte: <Map size={20} color="#f59e0b" />,             // Orange
  usagers: <Users size={20} color="#6366f1" />,         // Indigo
  alertes: <AlertTriangle size={20} color="#ef4444" />, // Rouge
  rapports: <ClipboardList size={20} color="#8b5cf6" />,// Violet

  // Fonctions secondaires
  notifications: <Bell size={20} color="#22d3ee" />,
  parametres: <Settings size={20} color="#94a3b8" />,
  deconnexion: <LogOut size={20} color="#64748b" />,

  // Autres utiles
  localisation: <MapPin size={20} color="#0ea5e9" />,
  niveau: <Gauge size={20} color="#22c55e" />,
  cadenas: <Lock size={20} color="#f97316" />,
  phone: <Phone size={20} color="black" />,
  trash: <Trash size={20} color="#991b1b" />,
  clock: <Clock size={20} color="#f59e0b" />,

  // Nouveaux
  arrowLeft: <ArrowLeft size={20} color="#fff" />,
  flag: <Flag size={16} color="black" />,
  connexion: <LogIn size={16} color="#22c55e" />
};
