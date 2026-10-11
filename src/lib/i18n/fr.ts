import type { Translations } from './en';

export const fr: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Se connecter avec Pi",
    logout:     "Se déconnecter",
    loading:    "Chargement...",
    comingSoon: "Bientôt disponible",
    live:       "Disponible",
  },
  dashboard: {
    greeting:   "Bienvenue,",
    welcomeNew: "🎉 Bienvenue sur TEC — Votre compte est prêt",
    stats: {
      piBalance:     "Solde Pi",
      tecWallet:     "Portefeuille TEC",
      availableApps: "Applications disponibles",
      activeApp:     "Active",
      subscription:  "Abonnement",
      upgradePro:    "Passer à Pro",
    },
    appsTitle: "Écosystème TEC",
    appsCount: "24 applications",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Un problème est survenu",
    errorBody:     "Cet écran n'a pas pu se charger. Vos données sont en sécurité — réessayez.",
    retry:         "Réessayer",
    goHome:        "Aller à l'accueil",
    notFoundTitle: "Page introuvable",
    notFoundBody:  "Cette page n'existe pas ou a été déplacée.",
    loadingLabel:  "Chargement",
  },
};
