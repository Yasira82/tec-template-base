import type { Translations } from './en';

export const ru: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Войти через Pi",
    logout:     "Выйти",
    loading:    "Загрузка...",
    comingSoon: "Скоро",
    live:       "Доступно",
  },
  dashboard: {
    greeting:   "Добро пожаловать,",
    welcomeNew: "🎉 Добро пожаловать в TEC — ваш аккаунт готов",
    stats: {
      piBalance:     "Баланс Pi",
      tecWallet:     "Кошелёк TEC",
      availableApps: "Доступные приложения",
      activeApp:     "Активно",
      subscription:  "Подписка",
      upgradePro:    "Перейти на Pro",
    },
    appsTitle: "Экосистема TEC",
    appsCount: "24 приложения",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Что-то пошло не так",
    errorBody:     "Не удалось загрузить этот экран. Ваши данные в безопасности — попробуйте снова.",
    retry:         "Попробовать снова",
    goHome:        "На главную",
    notFoundTitle: "Страница не найдена",
    notFoundBody:  "Эта страница не существует или была перемещена.",
    loadingLabel:  "Загрузка",
  },
};
