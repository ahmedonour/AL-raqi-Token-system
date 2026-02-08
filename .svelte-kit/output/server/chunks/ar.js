const hello = "مرحباً";
const hospital = {
  title: "مستشفى الراقي الجامعي",
  tokenManagementSystem: "نظام إدارة الرموز"
};
const dashboard = "لوحة التحكم";
const filters = {
  allServices: "جميع الخدمات",
  clinics: "العيادات",
  laboratories: "المختبرات"
};
const queue = {
  inQueue: "{count} في الانتظار",
  positionInQueue: "الترتيب في الطابور"
};
const emptyState = {
  noSections: "لا توجد أقسام متاحة. يرجى الاتصال بالمسؤول."
};
const currency = "ج.س";
const tokenPage = {
  subtitle: "رمز الدور",
  yourTokenNumber: "رقم الرمز الخاص بك",
  section: "القسم:",
  type: "النوع:",
  clinic: "عيادة",
  laboratory: "مختبر",
  feePaid: "الرسوم المدفوعة:",
  printToken: "طباعة الرمز",
  backToHome: "العودة للرئيسية",
  thankYouMessage: "شكراً لاختياركم"
};
const paymentPage = {
  titlePrefix: "الدفع -",
  loading: "جاري التحميل...",
  back: "← رجوع",
  serviceFee: "رسوم الخدمة",
  proceedToPayment: "💳 متابعة الدفع",
  manualPaymentInfo: "يرجى التوجه إلى الكاشير لإتمام الدفع يدوياً.",
  paymentConfirmed: "تم تأكيد الدفع",
  generateToken: "🎫 إنشاء رمز",
  generateTokenInfo: "انقر أعلاه لإنشاء رمز الدور الخاص بك.",
  sectionNotFound: "القسم غير موجود",
  returnToHome: "← العودة للرئيسية"
};
const ar = {
  hello,
  hospital,
  dashboard,
  filters,
  queue,
  emptyState,
  currency,
  tokenPage,
  paymentPage
};
export {
  currency,
  dashboard,
  ar as default,
  emptyState,
  filters,
  hello,
  hospital,
  paymentPage,
  queue,
  tokenPage
};
