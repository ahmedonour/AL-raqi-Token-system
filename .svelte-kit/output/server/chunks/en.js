const hello = "Hello";
const hospital = {
  title: "AL Raqi University Hospital",
  tokenManagementSystem: "Token Management System"
};
const dashboard = "Dashboard";
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
const en = {
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
  en as default,
  emptyState,
  filters,
  hello,
  hospital,
  paymentPage,
  queue,
  tokenPage
};
