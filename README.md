/suivi_carburant_front/
│
├── package.json
├── next.config.js
├── jsconfig.json
├── .env.local
│
├── public/
│   ├── logo.png
│   ├── favicon.ico
│   └── icons/
│
├── pages/
│   ├── index.js                     # Page de connexion principale (admin + station)
│   ├── inscription.js               # Page d’inscription (si nécessaire)
│   │
│   ├── dashboard.js                 # Interface admin
│   ├── station/
│   │   └── dashboard.js             # Interface station
│   │
│   ├── api/
│   │   └── url.js                   # ✅ Fichier central API_BASE_URL, headers, erreurs
│   │
│   └── _app.js                      # Point d’entrée global (styles, providers, etc.)
│
├── components/
│   ├── layouts/
│   │   ├── DashboardLayout.js       # Layout général admin (sidebar, header, etc.)
│   │   └── StationLayout.js         # Layout station
│   │
│   ├── auth/
│   │   ├── AuthLayout.js            # Layout connexion/inscription
│   │   └── ProtectedRoute.js        # ✅ Composant de protection d’accès
│   │
│   ├── forms/
│   │   ├── FormStyles.js            # Composants stylés (Input, SubmitButton, etc.)
│   │   └── LoginForm.js             # (optionnel) pour isoler le formulaire de login
│   │
│   ├── dashboard/
│   │   ├── AdminStats.js
│   │   ├── StationCard.js
│   │   ├── FuelChart.js
│   │   └── etc...
│   │
│   └── ui/
│       ├── Loader.js
│       ├── Alert.js
│       └── Modal.js
│
├── styles/
│   ├── globals.css
│   ├── auth.css
│   ├── dashboard.css
│   └── etc...
│
└── utils/
    ├── auth.js                      # Fonctions utilitaires (getUser, logout, etc.)
    ├── fetcher.js                   # Si tu veux centraliser tes appels fetch/axios
    └── helpers.js                   # Fonctions diverses réutilisables
