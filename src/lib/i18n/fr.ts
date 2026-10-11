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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Aide et avis",
    intro:   "Les réponses aux questions fréquentes — et un moyen de nous dire tout le reste.",
    q1:      "Comment me connecter ?",
    a1:      "Touchez « Se connecter avec Pi ». Dans le Pi Browser, votre compte Pi vous connecte ; rien d’autre n’est nécessaire.",
    q2:      "Comment fonctionnent les paiements ?",
    a2:      "Chaque paiement est approuvé par vous dans votre portefeuille Pi. TEC ne déplace jamais de Pi sans cette approbation.",
    q3:      "Qui voit mes données ?",
    a3:      "Vous seul, et seulement ce que vous choisissez de partager. La politique de confidentialité ci-dessous dit exactement ce qui est conservé.",
    privacy: "Confidentialité",
    terms:   "Conditions",
    back:    "Retour à l’application",
  },
  feedback: {
    title:       "Dites-nous ce que vous en pensez",
    placeholder: "Ce qui a marché, ce qui n’a pas marché, ce que vous aimeriez que cette app fasse…",
    send:        "Envoyer",
    sending:     "Envoi…",
    thanks:      "Merci — votre message est arrivé.",
    thanksHint:  "L’équipe lit chaque message. S’il demande une réponse, vous la recevrez dans TEC.",
    sendAnother: "En envoyer un autre",
    tooShort:    "Écrivez d’abord quelques mots.",
    tooLong:     "{n} caractères — merci de rester sous 2000.",
    failed:      "L’envoi a échoué. Réessayez dans un instant.",
    privacyNote: "Envoyé avec votre nom d’utilisateur Pi et la page où vous êtes — rien d’autre.",
  },
};
