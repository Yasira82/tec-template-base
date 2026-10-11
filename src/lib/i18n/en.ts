export const en = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Sign in with Pi",
    logout:     "Logout",
    loading:    "Loading...",
    comingSoon: "Coming Soon",
    live:       "Live",
  },
  dashboard: {
    greeting:   "Welcome,",
    welcomeNew: "🎉 Welcome to TEC — Your account is ready",
    stats: {
      piBalance:     "Pi Balance",
      tecWallet:     "TEC Wallet",
      availableApps: "Available Apps",
      activeApp:     "Active",
      subscription:  "Subscription",
      upgradePro:    "Upgrade to Pro",
    },
    appsTitle: "TEC Ecosystem",
    appsCount: "24 Apps",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Something went wrong",
    errorBody:     "This screen could not load. Your data is safe — try again.",
    retry:         "Try again",
    goHome:        "Go to home",
    notFoundTitle: "Page not found",
    notFoundBody:  "This page does not exist or was moved.",
    loadingLabel:  "Loading",
  },
};

/** The shape every locale must have — the same keys, in all twelve. */
export type Translations = typeof en;
