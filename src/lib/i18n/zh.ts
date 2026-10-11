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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "帮助与反馈",
    intro:   "常见问题的解答 — 以及告诉我们其他任何事情的方式。",
    q1:      "如何登录？",
    a1:      "点击“使用 Pi 登录”。在 Pi 浏览器中，您的 Pi 账户会自动登录，无需其他操作。",
    q2:      "付款如何进行？",
    a2:      "每笔付款都由您在 Pi 钱包中批准。未经批准，TEC 绝不会转移 Pi。",
    q3:      "谁能看到我的数据？",
    a3:      "只有您，且只有您选择分享的内容。下方的隐私政策准确说明保存了什么。",
    privacy: "隐私",
    terms:   "条款",
    back:    "返回应用",
  },
  feedback: {
    title:       "告诉我们您的想法",
    placeholder: "哪些好用，哪些不好用，您希望这个应用做什么…",
    send:        "发送",
    sending:     "发送中…",
    thanks:      "谢谢 — 您的消息已送达。",
    thanksHint:  "团队会阅读每一条消息。如需回复，您会在 TEC 内收到。",
    sendAnother: "再发一条",
    tooShort:    "请先写几个字。",
    tooLong:     "{n} 个字符 — 请保持在 2000 以内。",
    failed:      "发送失败，请稍后重试。",
    privacyNote: "随消息发送您的 Pi 用户名和当前页面 — 仅此而已。",
  },
};
