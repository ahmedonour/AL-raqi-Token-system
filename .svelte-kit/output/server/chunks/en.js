const hello = "Hello";
const hospital = {
  title: "AL Raqi University Hospital",
  tokenManagementSystem: "Token Management System"
};
const dashboard = {
  title: "Dashboard - AL Raqi University Hospital",
  heading: "🏥 Dashboard",
  adminPanel: "AL Raqi University Hospital - Admin Panel",
  backToHome: "← Back to Home",
  totalSections: "Total Sections",
  inQueue: "In Queue",
  totalTokens: "Total Tokens",
  todaysRevenue: "Today's Revenue",
  sectionsManagement: "Sections Management",
  queueMonitor: "Queue Monitor",
  sectionsServices: "Sections & Services",
  addSection: "+ Add Section",
  resetAll: "Reset All",
  table: {
    id: "ID",
    name: "Name",
    type: "Type",
    price: "Price (SDG)",
    queue: "Queue",
    actions: "Actions"
  },
  sectionType: {
    clinic: "Clinic",
    laboratory: "Laboratory"
  },
  edit: "Edit",
  "delete": "Delete",
  liveQueueMonitor: "Live Queue Monitor",
  waiting: "waiting",
  noTokensInQueue: "No tokens in queue",
  modal: {
    editSection: "Edit Section",
    addSection: "Add New Section",
    sectionName: "Section Name",
    sectionNamePlaceholder: "e.g., Cardiology",
    type: "Type",
    price: "Price (SDG)",
    cancel: "Cancel",
    updateSection: "Update Section",
    addSectionButton: "Add Section"
  },
  alerts: {
    fillAllFields: "Please fill all fields correctly",
    confirmDeleteSection: "Are you sure you want to delete this section?",
    confirmRemoveToken: "Remove token #{tokenNumber} from queue?",
    confirmResetAllData: "This will reset all sections and queues to default. Are you sure?"
  }
};
const filters = {
  allServices: "All Services",
  clinics: "Clinics",
  laboratories: "Laboratories"
};
const queue = {
  inQueue: "{count} in queue",
  positionInQueue: "Position in Queue"
};
const emptyState = {
  noSections: "No sections available. Please contact administrator."
};
const currency = "SDG";
const tokenPage = {
  subtitle: "Queue Token",
  yourTokenNumber: "Your Token Number",
  section: "Section:",
  type: "Type:",
  clinic: "Clinic",
  laboratory: "Laboratory",
  feePaid: "Fee Paid:",
  printToken: "Print Token",
  backToHome: "Back to Home",
  thankYouMessage: "Thank you for choosing"
};
const paymentPage = {
  titlePrefix: "Payment -",
  loading: "Loading...",
  back: "← Back",
  serviceFee: "Service Fee",
  proceedToPayment: "💳 Proceed to Payment",
  manualPaymentInfo: "Please proceed to the cashier for manual payment.",
  paymentConfirmed: "Payment Confirmed",
  generateToken: "🎫 Generate Token",
  generateTokenInfo: "Click above to generate your queue token.",
  sectionNotFound: "Section not found",
  returnToHome: "← Return to Home"
};
const downloadApk = "Download APK";
const en = {
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
  en as default,
  downloadApk,
  emptyState,
  filters,
  hello,
  hospital,
  paymentPage,
  queue,
  tokenPage
};
