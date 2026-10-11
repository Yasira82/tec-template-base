import type { Translations } from './en';

export const ko: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Pi로 로그인",
    logout:     "로그아웃",
    loading:    "불러오는 중...",
    comingSoon: "곧 출시",
    live:       "이용 가능",
  },
  dashboard: {
    greeting:   "환영합니다,",
    welcomeNew: "🎉 TEC에 오신 것을 환영합니다 — 계정이 준비되었습니다",
    stats: {
      piBalance:     "Pi 잔액",
      tecWallet:     "TEC 지갑",
      availableApps: "사용 가능한 앱",
      activeApp:     "사용 중",
      subscription:  "구독",
      upgradePro:    "Pro로 업그레이드",
    },
    appsTitle: "TEC 생태계",
    appsCount: "앱 24개",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "문제가 발생했습니다",
    errorBody:     "이 화면을 불러올 수 없습니다. 데이터는 안전합니다 — 다시 시도해 주세요.",
    retry:         "다시 시도",
    goHome:        "홈으로",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody:  "이 페이지는 존재하지 않거나 이동되었습니다.",
    loadingLabel:  "불러오는 중",
  },
};
