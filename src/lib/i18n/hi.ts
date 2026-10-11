import type { Translations } from './en';

export const hi: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Pi से साइन इन करें",
    logout:     "लॉग आउट",
    loading:    "लोड हो रहा है...",
    comingSoon: "जल्द आ रहा है",
    live:       "उपलब्ध",
  },
  dashboard: {
    greeting:   "स्वागत है,",
    welcomeNew: "🎉 TEC में आपका स्वागत है — आपका खाता तैयार है",
    stats: {
      piBalance:     "Pi बैलेंस",
      tecWallet:     "TEC वॉलेट",
      availableApps: "उपलब्ध ऐप्स",
      activeApp:     "सक्रिय",
      subscription:  "सदस्यता",
      upgradePro:    "Pro में अपग्रेड करें",
    },
    appsTitle: "TEC इकोसिस्टम",
    appsCount: "24 ऐप्स",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "कुछ गलत हो गया",
    errorBody:     "यह स्क्रीन लोड नहीं हो सकी। आपका डेटा सुरक्षित है — फिर से कोशिश करें।",
    retry:         "फिर से कोशिश करें",
    goHome:        "होम पर जाएँ",
    notFoundTitle: "पेज नहीं मिला",
    notFoundBody:  "यह पेज मौजूद नहीं है या हटा दिया गया है।",
    loadingLabel:  "लोड हो रहा है",
  },
};
