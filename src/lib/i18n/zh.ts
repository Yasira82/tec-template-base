import type { Translations } from './en';

export const zh: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "使用 Pi 登录",
    logout:     "退出登录",
    loading:    "加载中...",
    comingSoon: "即将推出",
    live:       "已上线",
  },
  dashboard: {
    greeting:   "欢迎，",
    welcomeNew: "🎉 欢迎来到 TEC — 您的账户已就绪",
    stats: {
      piBalance:     "Pi 余额",
      tecWallet:     "TEC 钱包",
      availableApps: "可用应用",
      activeApp:     "使用中",
      subscription:  "订阅",
      upgradePro:    "升级到 Pro",
    },
    appsTitle: "TEC 生态",
    appsCount: "24 个应用",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "出了点问题",
    errorBody:     "此页面无法加载。您的数据是安全的 — 请重试。",
    retry:         "重试",
    goHome:        "返回首页",
    notFoundTitle: "页面未找到",
    notFoundBody:  "此页面不存在或已移动。",
    loadingLabel:  "加载中",
  },
};
