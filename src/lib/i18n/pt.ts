import type { Translations } from './en';

export const pt: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Entrar com Pi",
    logout:     "Sair",
    loading:    "Carregando...",
    comingSoon: "Em breve",
    live:       "Disponível",
  },
  dashboard: {
    greeting:   "Bem-vindo,",
    welcomeNew: "🎉 Bem-vindo ao TEC — Sua conta está pronta",
    stats: {
      piBalance:     "Saldo de Pi",
      tecWallet:     "Carteira TEC",
      availableApps: "Apps disponíveis",
      activeApp:     "Ativo",
      subscription:  "Assinatura",
      upgradePro:    "Fazer upgrade para Pro",
    },
    appsTitle: "Ecossistema TEC",
    appsCount: "24 apps",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Algo deu errado",
    errorBody:     "Não foi possível carregar esta tela. Seus dados estão seguros — tente de novo.",
    retry:         "Tentar de novo",
    goHome:        "Ir para o início",
    notFoundTitle: "Página não encontrada",
    notFoundBody:  "Esta página não existe ou foi movida.",
    loadingLabel:  "Carregando",
  },
};
