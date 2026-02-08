const hello = "مرحباً";
const hospital = {
  title: "مستشفى الراقي الجامعي",
  tokenManagementSystem: "نظام إدارة التذاكر"
};
const dashboard = {
  title: "لوحة التحكم - مستشفى الراقي الجامعي",
  heading: "لوحة التحكم",
  adminPanel: "لوحة الإدارة - مستشفى الراقي الجامعي",
  backToHome: "← العودة للصفحة الرئيسية",
  totalSections: "إجمالي الأقسام",
  inQueue: "في الانتظار",
  totalTokens: "إجمالي التذاكر",
  todaysRevenue: "إيرادات اليوم",
  sectionsManagement: "إدارة الأقسام",
  queueMonitor: "مراقبة الطوابير",
  sectionsServices: "الأقسام والخدمات",
  addSection: "+ إضافة قسم",
  resetAll: "إعادة تعيين الكل",
  table: {
    id: "الرقم",
    name: "الاسم",
    type: "النوع",
    price: "السعر (ج.س)",
    queue: "الطابور",
    actions: "الإجراءات"
  },
  sectionType: {
    clinic: "عيادة",
    laboratory: "مختبر"
  },
  edit: "تعديل",
  "delete": "حذف",
  liveQueueMonitor: "مراقبة الطوابير الحية",
  waiting: "في الانتظار",
  noTokensInQueue: "لا توجد تذاكر في الطابور",
  modal: {
    editSection: "تعديل القسم",
    addSection: "إضافة قسم جديد",
    sectionName: "اسم القسم",
    sectionNamePlaceholder: "مثال: أمراض القلب",
    type: "النوع",
    price: "السعر (ج.س)",
    cancel: "إلغاء",
    updateSection: "تحديث القسم",
    addSectionButton: "إضافة قسم"
  },
  alerts: {
    fillAllFields: "الرجاء تعبئة جميع الحقول بشكل صحيح",
    confirmDeleteSection: "هل أنت متأكد أنك تريد حذف هذا القسم؟",
    confirmRemoveToken: "إزالة التذكرة #{tokenNumber} من الطابور؟",
    confirmResetAllData: "سيؤدي هذا إلى إعادة تعيين جميع الأقسام والطوابير إلى الإعدادات الافتراضية. هل أنت متأكد؟"
  }
};
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
  subtitle: "تذكرة الدور",
  yourTokenNumber: "رقم التذكرة الخاص بك",
  section: "القسم:",
  type: "النوع:",
  clinic: "عيادة",
  laboratory: "مختبر",
  feePaid: "الرسوم المدفوعة:",
  printToken: "طباعة التذكرة",
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
  generateToken: "🎫 إنشاء تذكرة",
  generateTokenInfo: "انقر أعلاه لإنشاء تذكرة الدور الخاصة بك.",
  sectionNotFound: "القسم غير موجود",
  returnToHome: "← العودة للرئيسية"
};
const downloadApk = "تحميل التطبيق";
const ar = {
  hello,
  hospital,
  dashboard,
  filters,
  queue,
  emptyState,
  currency,
  tokenPage,
  paymentPage,
  downloadApk
};
export {
  currency,
  dashboard,
  ar as default,
  downloadApk,
  emptyState,
  filters,
  hello,
  hospital,
  paymentPage,
  queue,
  tokenPage
};
