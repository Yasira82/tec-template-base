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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "도움말 및 의견",
    intro:   "자주 묻는 질문에 대한 답변 — 그리고 그 밖의 모든 것을 알려 주실 수 있는 방법.",
    q1:      "어떻게 로그인하나요?",
    a1:      "“Pi로 로그인”을 누르세요. Pi 브라우저에서는 Pi 계정이 로그인해 주며, 다른 것은 필요 없습니다.",
    q2:      "결제는 어떻게 되나요?",
    a2:      "모든 결제는 Pi 지갑에서 직접 승인합니다. 승인 없이 TEC가 Pi를 옮기는 일은 없습니다.",
    q3:      "제 데이터는 누가 보나요?",
    a3:      "오직 본인만, 그리고 공유하기로 선택한 것만 봅니다. 아래 개인정보 처리방침에 보관 내용이 정확히 나와 있습니다.",
    privacy: "개인정보",
    terms:   "이용약관",
    back:    "앱으로 돌아가기",
  },
  feedback: {
    title:       "의견을 들려주세요",
    placeholder: "잘 된 점, 안 된 점, 이 앱에 바라는 점…",
    send:        "보내기",
    sending:     "보내는 중…",
    thanks:      "감사합니다 — 메시지가 도착했습니다.",
    thanksHint:  "팀이 모든 메시지를 읽습니다. 답변이 필요하면 TEC 안에서 받게 됩니다.",
    sendAnother: "하나 더 보내기",
    tooShort:    "먼저 몇 단어를 적어 주세요.",
    tooLong:     "{n}자 — 2000자 미만으로 줄여 주세요.",
    failed:      "보내지 못했습니다. 잠시 후 다시 시도해 주세요.",
    privacyNote: "Pi 사용자 이름과 현재 페이지만 함께 전송됩니다.",
  },
};
