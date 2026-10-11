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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "المساعدة والملاحظات",
    intro:   "إجابات للأسئلة الشائعة — وطريقة تقول لنا بها أي شيء آخر.",
    q1:      "كيف أسجّل الدخول؟",
    a1:      "اضغط «تسجيل الدخول بـ Pi». داخل متصفح Pi يسجّلك حساب Pi تلقائياً؛ لا تحتاج شيئاً آخر.",
    q2:      "كيف تعمل المدفوعات؟",
    a2:      "كل دفعة توافق عليها أنت في محفظة Pi. لا تحرّك TEC أي Pi بدون هذه الموافقة.",
    q3:      "من يرى بياناتي؟",
    a3:      "أنت فقط، وفقط ما تختار مشاركته. سياسة الخصوصية بالأسفل توضح بالضبط ما يُحفظ.",
    privacy: "الخصوصية",
    terms:   "الشروط",
    back:    "العودة للتطبيق",
  },
  feedback: {
    title:       "قل لنا رأيك",
    placeholder: "ما الذي نجح، وما الذي لم ينجح، وما الذي تتمنى أن يفعله التطبيق…",
    send:        "إرسال",
    sending:     "جارٍ الإرسال…",
    thanks:      "شكراً — وصلت رسالتك.",
    thanksHint:  "الفريق يقرأ كل رسالة. إذا احتاجت رداً، سيصلك داخل TEC.",
    sendAnother: "إرسال رسالة أخرى",
    tooShort:    "اكتب بضع كلمات أولاً.",
    tooLong:     "{n} حرفاً — من فضلك اجعلها أقل من 2000.",
    failed:      "تعذّر الإرسال. حاول مرة أخرى بعد قليل.",
    privacyNote: "تُرسل مع اسم مستخدم Pi والصفحة التي أنت فيها — ولا شيء غير ذلك.",
  },
};
