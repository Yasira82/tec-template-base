import type { Translations } from './en';

export const vi: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Đăng nhập bằng Pi",
    logout:     "Đăng xuất",
    loading:    "Đang tải...",
    comingSoon: "Sắp ra mắt",
    live:       "Hoạt động",
  },
  dashboard: {
    greeting:   "Chào mừng,",
    welcomeNew: "🎉 Chào mừng đến với TEC — Tài khoản của bạn đã sẵn sàng",
    stats: {
      piBalance:     "Số dư Pi",
      tecWallet:     "Ví TEC",
      availableApps: "Ứng dụng có sẵn",
      activeApp:     "Đang dùng",
      subscription:  "Gói đăng ký",
      upgradePro:    "Nâng cấp lên Pro",
    },
    appsTitle: "Hệ sinh thái TEC",
    appsCount: "24 ứng dụng",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Đã xảy ra lỗi",
    errorBody:     "Không thể tải màn hình này. Dữ liệu của bạn vẫn an toàn — hãy thử lại.",
    retry:         "Thử lại",
    goHome:        "Về trang chủ",
    notFoundTitle: "Không tìm thấy trang",
    notFoundBody:  "Trang này không tồn tại hoặc đã được chuyển.",
    loadingLabel:  "Đang tải",
  },
};
