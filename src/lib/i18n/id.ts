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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Bantuan & masukan",
    intro:   "Jawaban atas pertanyaan umum — dan cara memberi tahu kami hal lainnya.",
    q1:      "Bagaimana cara masuk?",
    a1:      "Ketuk “Masuk dengan Pi”. Di Pi Browser, akun Pi Anda yang memasukkan Anda; tidak perlu apa pun lagi.",
    q2:      "Bagaimana pembayaran bekerja?",
    a2:      "Setiap pembayaran Anda setujui sendiri di dompet Pi. TEC tidak pernah memindahkan Pi tanpa persetujuan itu.",
    q3:      "Siapa yang melihat data saya?",
    a3:      "Hanya Anda, dan hanya yang Anda pilih untuk dibagikan. Kebijakan privasi di bawah menjelaskan persis apa yang disimpan.",
    privacy: "Privasi",
    terms:   "Ketentuan",
    back:    "Kembali ke aplikasi",
  },
  feedback: {
    title:       "Beri tahu pendapat Anda",
    placeholder: "Apa yang berhasil, apa yang tidak, apa yang Anda harapkan dari aplikasi ini…",
    send:        "Kirim",
    sending:     "Mengirim…",
    thanks:      "Terima kasih — pesan Anda sudah sampai.",
    thanksHint:  "Tim membaca setiap pesan. Jika perlu jawaban, Anda akan menerimanya di dalam TEC.",
    sendAnother: "Kirim lagi",
    tooShort:    "Tulis beberapa kata dulu.",
    tooLong:     "{n} karakter — mohon di bawah 2000.",
    failed:      "Gagal mengirim. Coba lagi sebentar lagi.",
    privacyNote: "Dikirim bersama nama pengguna Pi dan halaman Anda saat ini — tidak lebih.",
  },
};
