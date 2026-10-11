import type { Translations } from './en';

export const tr: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Pi ile giriş yap",
    logout:     "Çıkış yap",
    loading:    "Yükleniyor...",
    comingSoon: "Yakında",
    live:       "Aktif",
  },
  dashboard: {
    greeting:   "Hoş geldin,",
    welcomeNew: "🎉 TEC'e hoş geldin — Hesabın hazır",
    stats: {
      piBalance:     "Pi Bakiyesi",
      tecWallet:     "TEC Cüzdanı",
      availableApps: "Mevcut Uygulamalar",
      activeApp:     "Aktif",
      subscription:  "Abonelik",
      upgradePro:    "Pro'ya yükselt",
    },
    appsTitle: "TEC Ekosistemi",
    appsCount: "24 Uygulama",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Bir şeyler ters gitti",
    errorBody:     "Bu ekran yüklenemedi. Verilerin güvende — tekrar dene.",
    retry:         "Tekrar dene",
    goHome:        "Ana sayfaya git",
    notFoundTitle: "Sayfa bulunamadı",
    notFoundBody:  "Bu sayfa yok ya da taşındı.",
    loadingLabel:  "Yükleniyor",
  },
};
