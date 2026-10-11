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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Yardım ve geri bildirim",
    intro:   "Sık sorulan soruların yanıtları — ve bize başka her şeyi söylemenin bir yolu.",
    q1:      "Nasıl giriş yaparım?",
    a1:      "“Pi ile giriş yap”a dokun. Pi Browser’da Pi hesabın seni giriş yaptırır; başka bir şey gerekmez.",
    q2:      "Ödemeler nasıl çalışır?",
    a2:      "Her ödemeyi Pi cüzdanında sen onaylarsın. TEC bu onay olmadan asla Pi taşımaz.",
    q3:      "Verilerimi kim görür?",
    a3:      "Yalnızca sen ve yalnızca paylaşmayı seçtiklerin. Aşağıdaki gizlilik politikası nelerin saklandığını tam olarak söyler.",
    privacy: "Gizlilik",
    terms:   "Şartlar",
    back:    "Uygulamaya dön",
  },
  feedback: {
    title:       "Ne düşündüğünü söyle",
    placeholder: "Ne işe yaradı, ne yaramadı, bu uygulamanın ne yapmasını isterdin…",
    send:        "Gönder",
    sending:     "Gönderiliyor…",
    thanks:      "Teşekkürler — mesajın ulaştı.",
    thanksHint:  "Ekip her mesajı okur. Yanıt gerekirse TEC içinde alırsın.",
    sendAnother: "Bir tane daha gönder",
    tooShort:    "Önce birkaç kelime yaz.",
    tooLong:     "{n} karakter — lütfen 2000’in altında tut.",
    failed:      "Gönderilemedi. Birazdan tekrar dene.",
    privacyNote: "Pi kullanıcı adın ve bulunduğun sayfayla gönderilir — başka hiçbir şey değil.",
  },
};
