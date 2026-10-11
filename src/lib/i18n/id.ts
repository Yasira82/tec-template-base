import type { Translations } from './en';

export const id: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Masuk dengan Pi",
    logout:     "Keluar",
    loading:    "Memuat...",
    comingSoon: "Segera Hadir",
    live:       "Aktif",
  },
  dashboard: {
    greeting:   "Selamat datang,",
    welcomeNew: "🎉 Selamat datang di TEC — Akun Anda sudah siap",
    stats: {
      piBalance:     "Saldo Pi",
      tecWallet:     "Dompet TEC",
      availableApps: "Aplikasi Tersedia",
      activeApp:     "Aktif",
      subscription:  "Langganan",
      upgradePro:    "Tingkatkan ke Pro",
    },
    appsTitle: "Ekosistem TEC",
    appsCount: "24 Aplikasi",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Terjadi kesalahan",
    errorBody:     "Layar ini tidak dapat dimuat. Data Anda aman — coba lagi.",
    retry:         "Coba lagi",
    goHome:        "Ke beranda",
    notFoundTitle: "Halaman tidak ditemukan",
    notFoundBody:  "Halaman ini tidak ada atau telah dipindahkan.",
    loadingLabel:  "Memuat",
  },
};
