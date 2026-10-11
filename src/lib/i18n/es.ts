import type { Translations } from './en';

export const es: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Iniciar sesión con Pi",
    logout:     "Cerrar sesión",
    loading:    "Cargando...",
    comingSoon: "Próximamente",
    live:       "Disponible",
  },
  dashboard: {
    greeting:   "Bienvenido,",
    welcomeNew: "🎉 Bienvenido a TEC — Tu cuenta está lista",
    stats: {
      piBalance:     "Saldo de Pi",
      tecWallet:     "Billetera TEC",
      availableApps: "Apps disponibles",
      activeApp:     "Activa",
      subscription:  "Suscripción",
      upgradePro:    "Mejorar a Pro",
    },
    appsTitle: "Ecosistema TEC",
    appsCount: "24 apps",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Algo salió mal",
    errorBody:     "Esta pantalla no se pudo cargar. Tus datos están a salvo — inténtalo de nuevo.",
    retry:         "Reintentar",
    goHome:        "Ir al inicio",
    notFoundTitle: "Página no encontrada",
    notFoundBody:  "Esta página no existe o se movió.",
    loadingLabel:  "Cargando",
  },
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Ayuda y comentarios",
    intro:   "Respuestas a las preguntas comunes — y una forma de contarnos cualquier otra cosa.",
    q1:      "¿Cómo inicio sesión?",
    a1:      "Toca «Iniciar sesión con Pi». En el Pi Browser tu cuenta de Pi inicia la sesión; no necesitas nada más.",
    q2:      "¿Cómo funcionan los pagos?",
    a2:      "Cada pago lo apruebas tú en tu billetera Pi. TEC nunca mueve Pi sin esa aprobación.",
    q3:      "¿Quién ve mis datos?",
    a3:      "Solo tú, y solo lo que elijas compartir. La política de privacidad de abajo dice exactamente qué se guarda.",
    privacy: "Privacidad",
    terms:   "Términos",
    back:    "Volver a la app",
  },
  feedback: {
    title:       "Cuéntanos qué piensas",
    placeholder: "Qué funcionó, qué no, qué te gustaría que hiciera esta app…",
    send:        "Enviar",
    sending:     "Enviando…",
    thanks:      "Gracias — tu mensaje llegó.",
    thanksHint:  "El equipo lee cada mensaje. Si necesita respuesta, la recibirás dentro de TEC.",
    sendAnother: "Enviar otro",
    tooShort:    "Escribe unas palabras primero.",
    tooLong:     "{n} caracteres — por favor, menos de 2000.",
    failed:      "No se pudo enviar. Inténtalo de nuevo en un momento.",
    privacyNote: "Se envía con tu usuario de Pi y la página en la que estás — nada más.",
  },
};
