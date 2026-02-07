# AL Raqi University Hospital - Token System

A modern Progressive Web App (PWA) for managing patient queue tokens at AL Raqi University Hospital.

## Features

✨ **Main Features:**
- 🏥 Section Selection - Browse clinics and laboratories with rounded card interface
- 💳 Payment Processing - Manual payment confirmation workflow
- 🎫 Token Generation - Print-ready queue tokens with unique numbers
- 📊 Admin Dashboard - Manage sections, monitor queues, and view statistics
- 📱 PWA Support - Install on mobile devices and work offline
- 💾 Local Storage - All data persists in browser storage

## Technology Stack

- **Frontend Framework:** SvelteKit 2.0
- **Styling:** Pure CSS with custom design system
- **PWA:** Service Worker with offline caching
- **Storage:** Browser localStorage
- **Build Tool:** Vite

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Access at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
hospital-token-system/
├── src/
│   ├── routes/
│   │   ├── +page.svelte              # Main section selection screen
│   │   ├── +layout.svelte            # Root layout with PWA setup
│   │   ├── payment/[id]/
│   │   │   └── +page.svelte          # Payment confirmation page
│   │   ├── token/[number]/
│   │   │   └── +page.svelte          # Token display & print page
│   │   └── dashboard/
│   │       └── +page.svelte          # Admin dashboard
│   ├── lib/
│   │   └── stores.js                 # Svelte stores for state management
│   ├── app.css                       # Global styles
│   └── app.html                      # HTML template
├── static/
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker
│   ├── icon-192.png                  # PWA icon 192x192
│   └── icon-512.png                  # PWA icon 512x512
└── svelte.config.js                  # SvelteKit configuration
```

## User Workflow

### Patient Journey:
1. **Select Section** - Choose from available clinics or laboratories
2. **View Price** - See service fee in SDG (Sudanese Pounds)
3. **Confirm Payment** - Click "Pay" and proceed to cashier
4. **Mark as Paid** - Cashier confirms payment manually
5. **Generate Token** - System creates unique queue number
6. **Print Token** - Patient receives printable token with queue position

### Admin Functions:
1. **Dashboard Access** - Click "Dashboard" button from home
2. **View Statistics** - Monitor total sections, queue length, and revenue
3. **Manage Sections** - Add, edit, or delete clinics/laboratories
4. **Monitor Queues** - Real-time view of all active queues
5. **Remove Tokens** - Mark patients as served

## Data Management

All data is stored in browser localStorage:
- **Sections:** Clinic and laboratory configurations
- **Queue Data:** Current tokens in each section
- **Token Counter:** Global token number sequence

### Reset Data
Use the "Reset All" button in the dashboard to restore default sections and clear all queues.

## Default Sections

### Clinics:
- General Medicine (100 SDG)
- Pediatrics (120 SDG)
- Cardiology (150 SDG)
- Orthopedics (150 SDG)
- Dermatology (130 SDG)

### Laboratories:
- Blood Test (80 SDG)
- X-Ray (200 SDG)
- Ultrasound (250 SDG)
- CT Scan (500 SDG)
- MRI (800 SDG)

## PWA Installation

### Android:
1. Open in Chrome
2. Tap menu (⋮) → "Install app" or "Add to Home screen"
3. Follow prompts to install

### iOS:
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Confirm installation

### Desktop:
1. Look for install icon in address bar
2. Click "Install" when prompted
3. App opens in standalone window

## Customization

### Adding New Sections:
1. Go to Dashboard
2. Click "Add Section"
3. Enter name, type (clinic/laboratory), and price
4. Click "Add Section"

### Modifying Prices:
1. Go to Dashboard
2. Find section in table
3. Click "Edit"
4. Update price
5. Click "Update Section"

## Printing Tokens

Tokens are designed to print cleanly:
- Optimized print layout automatically applied
- Navigation elements hidden during print
- Clear token number and section information
- Date and time included
- Queue position displayed

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with PWA support

## Contributing

To add new features:
1. Modify Svelte components in `src/routes/`
2. Update stores in `src/lib/stores.js` for new data
3. Add styles using CSS custom properties
4. Test PWA functionality after changes

## License

© 2026 AL Raqi University Hospital

## Support

For issues or questions, contact the hospital IT department.

---

**Version:** 1.0.0  
**Last Updated:** February 2026
