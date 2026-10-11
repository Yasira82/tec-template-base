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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Помощь и отзывы",
    intro:   "Ответы на частые вопросы — и способ рассказать нам обо всём остальном.",
    q1:      "Как войти?",
    a1:      "Нажмите «Войти через Pi». В Pi Browser ваш аккаунт Pi выполнит вход; больше ничего не нужно.",
    q2:      "Как работают платежи?",
    a2:      "Каждый платёж вы подтверждаете сами в кошельке Pi. TEC никогда не переводит Pi без этого подтверждения.",
    q3:      "Кто видит мои данные?",
    a3:      "Только вы и только то, чем вы решили поделиться. Политика конфиденциальности ниже точно указывает, что хранится.",
    privacy: "Конфиденциальность",
    terms:   "Условия",
    back:    "Назад в приложение",
  },
  feedback: {
    title:       "Расскажите, что вы думаете",
    placeholder: "Что сработало, что нет, чего вы хотите от этого приложения…",
    send:        "Отправить",
    sending:     "Отправка…",
    thanks:      "Спасибо — ваше сообщение получено.",
    thanksHint:  "Команда читает каждое сообщение. Если нужен ответ, вы получите его в TEC.",
    sendAnother: "Отправить ещё",
    tooShort:    "Сначала напишите несколько слов.",
    tooLong:     "{n} символов — пожалуйста, меньше 2000.",
    failed:      "Не удалось отправить. Попробуйте ещё раз чуть позже.",
    privacyNote: "Отправляется с вашим именем пользователя Pi и текущей страницей — больше ничего.",
  },
};
