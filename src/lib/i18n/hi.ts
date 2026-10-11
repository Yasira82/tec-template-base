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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "मदद और सुझाव",
    intro:   "आम सवालों के जवाब — और हमें कुछ भी बताने का तरीका।",
    q1:      "साइन इन कैसे करूँ?",
    a1:      "“Pi से साइन इन करें” दबाएँ। Pi Browser में आपका Pi खाता आपको साइन इन करता है; और कुछ नहीं चाहिए।",
    q2:      "भुगतान कैसे होता है?",
    a2:      "हर भुगतान आप अपने Pi वॉलेट में खुद मंज़ूर करते हैं। उस मंज़ूरी के बिना TEC कभी Pi नहीं भेजता।",
    q3:      "मेरा डेटा कौन देखता है?",
    a3:      "सिर्फ़ आप, और सिर्फ़ वही जो आप साझा करना चुनें। नीचे दी गई गोपनीयता नीति बताती है कि क्या रखा जाता है।",
    privacy: "गोपनीयता",
    terms:   "शर्तें",
    back:    "ऐप पर वापस",
  },
  feedback: {
    title:       "हमें अपनी राय बताएँ",
    placeholder: "क्या अच्छा चला, क्या नहीं, आप इस ऐप से क्या चाहते हैं…",
    send:        "भेजें",
    sending:     "भेजा जा रहा है…",
    thanks:      "धन्यवाद — आपका संदेश पहुँच गया।",
    thanksHint:  "टीम हर संदेश पढ़ती है। जवाब की ज़रूरत हुई तो आपको TEC में ही मिलेगा।",
    sendAnother: "एक और भेजें",
    tooShort:    "पहले कुछ शब्द लिखें।",
    tooLong:     "{n} अक्षर — कृपया 2000 से कम रखें।",
    failed:      "भेजा नहीं जा सका। थोड़ी देर बाद फिर कोशिश करें।",
    privacyNote: "आपके Pi उपयोगकर्ता नाम और मौजूदा पेज के साथ भेजा जाता है — और कुछ नहीं।",
  },
};
