import type { Translations } from './en';

export const ar: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "تسجيل الدخول بـ Pi",
    logout:     "تسجيل الخروج",
    loading:    "جارٍ التحميل...",
    comingSoon: "قريباً",
    live:       "متاح",
  },
  dashboard: {
    greeting:   "أهلاً،",
    welcomeNew: "🎉 أهلاً بك في TEC — حسابك جاهز",
    stats: {
      piBalance:     "رصيد Pi",
      tecWallet:     "محفظة TEC",
      availableApps: "التطبيقات المتاحة",
      activeApp:     "نشط",
      subscription:  "الاشتراك",
      upgradePro:    "الترقية إلى Pro",
    },
    appsTitle: "منظومة TEC",
    appsCount: "24 تطبيقاً",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "حدث خطأ ما",
    errorBody:     "تعذّر تحميل هذه الشاشة. بياناتك بأمان — حاول مرة أخرى.",
    retry:         "حاول مرة أخرى",
    goHome:        "الذهاب للرئيسية",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody:  "هذه الصفحة غير موجودة أو تم نقلها.",
    loadingLabel:  "جارٍ التحميل",
  },
};
