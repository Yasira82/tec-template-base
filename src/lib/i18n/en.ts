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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Help & feedback",
    intro:   "Answers to the common questions — and a way to tell us anything else.",
    q1:      "How do I sign in?",
    a1:      "Tap “Sign in with Pi”. Inside the Pi Browser your Pi account signs you in; nothing else is needed.",
    q2:      "How do payments work?",
    a2:      "Every payment is approved by you in your Pi wallet. TEC never moves Pi without that approval.",
    q3:      "Who sees my data?",
    a3:      "Only you, and only what you choose to share. The privacy policy below says exactly what is kept.",
    privacy: "Privacy",
    terms:   "Terms",
    back:    "Back to the app",
  },
  feedback: {
    title:       "Tell us what you think",
    placeholder: "What worked, what did not, what you wish this app did…",
    send:        "Send",
    sending:     "Sending…",
    thanks:      "Thank you — your message arrived.",
    thanksHint:  "The team reads every message. If it needs an answer, you will hear back inside TEC.",
    sendAnother: "Send another",
    tooShort:    "Write a few words first.",
    tooLong:     "{n} characters — please keep it under 2000.",
    failed:      "It could not be sent. Try again in a moment.",
    privacyNote: "Sent with your Pi username and the page you are on — nothing else.",
  },
};

/** The shape every locale must have — the same keys, in all twelve. */
export type Translations = typeof en;
