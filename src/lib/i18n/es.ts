import type { Translations } from './en';

export const es: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Iniciar sesión con Pi",
    logout:     "Cerrar sesión",
    loading:    "Cargando...",
    comingSoon: "Próximamente",
    live:       "Disponible",
  },
  dashboard: {
    greeting:   "Bienvenido,",
    welcomeNew: "🎉 Bienvenido a TEC — Tu cuenta está lista",
    stats: {
      piBalance:     "Saldo de Pi",
      tecWallet:     "Billetera TEC",
      availableApps: "Apps disponibles",
      activeApp:     "Activa",
      subscription:  "Suscripción",
      upgradePro:    "Mejorar a Pro",
    },
    appsTitle: "Ecosistema TEC",
    appsCount: "24 apps",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Algo salió mal",
    errorBody:     "Esta pantalla no se pudo cargar. Tus datos están a salvo — inténtalo de nuevo.",
    retry:         "Reintentar",
    goHome:        "Ir al inicio",
    notFoundTitle: "Página no encontrada",
    notFoundBody:  "Esta página no existe o se movió.",
    loadingLabel:  "Cargando",
  },
};
