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
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Trợ giúp & góp ý",
    intro:   "Giải đáp các câu hỏi thường gặp — và cách để nói với chúng tôi bất cứ điều gì khác.",
    q1:      "Làm sao để đăng nhập?",
    a1:      "Nhấn “Đăng nhập bằng Pi”. Trong Pi Browser, tài khoản Pi sẽ đăng nhập cho bạn; không cần gì thêm.",
    q2:      "Thanh toán hoạt động thế nào?",
    a2:      "Mọi khoản thanh toán đều do bạn phê duyệt trong ví Pi. TEC không bao giờ chuyển Pi khi chưa có phê duyệt đó.",
    q3:      "Ai xem được dữ liệu của tôi?",
    a3:      "Chỉ bạn, và chỉ những gì bạn chọn chia sẻ. Chính sách quyền riêng tư bên dưới nói rõ những gì được lưu.",
    privacy: "Quyền riêng tư",
    terms:   "Điều khoản",
    back:    "Quay lại ứng dụng",
  },
  feedback: {
    title:       "Cho chúng tôi biết suy nghĩ của bạn",
    placeholder: "Điều gì ổn, điều gì chưa ổn, bạn mong ứng dụng làm gì…",
    send:        "Gửi",
    sending:     "Đang gửi…",
    thanks:      "Cảm ơn — tin nhắn của bạn đã đến.",
    thanksHint:  "Đội ngũ đọc mọi tin nhắn. Nếu cần trả lời, bạn sẽ nhận được ngay trong TEC.",
    sendAnother: "Gửi tin khác",
    tooShort:    "Hãy viết vài chữ trước.",
    tooLong:     "{n} ký tự — vui lòng giữ dưới 2000.",
    failed:      "Không gửi được. Hãy thử lại sau giây lát.",
    privacyNote: "Gửi kèm tên người dùng Pi và trang bạn đang ở — không gì khác.",
  },
};
