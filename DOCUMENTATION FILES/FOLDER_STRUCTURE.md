# AL Raqi Hospital Token System - Complete Folder Structure

```
hospital-token-system/
│
├── 📄 DOCUMENTATION FILES
│   ├── README.md                    # Main documentation - start here
│   ├── QUICKSTART.md                # 3-step setup guide
│   ├── FEATURES.md                  # Complete feature descriptions
│   ├── DEPLOYMENT.md                # How to deploy to production
│   ├── TROUBLESHOOTING.md           # Common issues & fixes
│   └── DOCS_INDEX.md                # Documentation navigation
│
├── ⚙️ CONFIGURATION FILES
│   ├── package.json                 # NPM dependencies & scripts
│   ├── svelte.config.js             # SvelteKit configuration
│   ├── vite.config.js               # Build tool settings
│   ├── .gitignore                   # Git ignore rules
│   └── setup.sh                     # Automated setup script
│
├── 📁 src/ (SOURCE CODE)
│   │
│   ├── app.html                     # Main HTML template with PWA meta tags
│   ├── app.css                      # Global CSS styles & design system
│   │
│   ├── 📁 lib/
│   │   └── stores.js                # Svelte stores (state management)
│   │                                # - sections store
│   │                                # - tokenCounter store
│   │                                # - localStorage integration
│   │
│   └── 📁 routes/ (PAGES)
│       │
│       ├── +layout.svelte           # Root layout component
│       │                            # - Imports global CSS
│       │                            # - Registers service worker
│       │
│       ├── +layout.js               # Layout configuration
│       │                            # - Enables static prerendering
│       │                            # - Disables SSR
│       │
│       ├── +page.svelte             # HOME PAGE (Main Screen)
│       │                            # - Section selection grid
│       │                            # - Filter tabs (All/Clinics/Labs)
│       │                            # - Rounded square buttons
│       │                            # - Dashboard link
│       │
│       ├── 📁 payment/[id]/
│       │   └── +page.svelte         # PAYMENT PAGE
│       │                            # - Shows selected section
│       │                            # - Displays price
│       │                            # - Payment confirmation
│       │                            # - Token generation trigger
│       │
│       ├── 📁 token/[number]/
│       │   └── +page.svelte         # TOKEN DISPLAY PAGE
│       │                            # - Large token number
│       │                            # - Section details
│       │                            # - Queue position
│       │                            # - Print button
│       │                            # - Print-optimized layout
│       │
│       └── 📁 dashboard/
│           └── +page.svelte         # ADMIN DASHBOARD
│                                    # - Statistics cards
│                                    # - Section management table
│                                    # - Queue monitor
│                                    # - Add/Edit/Delete sections
│                                    # - Real-time queue display
│
└── 📁 static/ (STATIC ASSETS)
    │
    ├── manifest.json                # PWA manifest
    │                                # - App name & description
    │                                # - Icons configuration
    │                                # - Display & theme settings
    │
    ├── sw.js                        # Service Worker
    │                                # - Offline caching
    │                                # - Asset caching strategy
    │                                # - Update mechanism
    │
    ├── icon-192.png                 # PWA Icon (192x192)
    ├── icon-512.png                 # PWA Icon (512x512)
    ├── favicon.png                  # Browser favicon
    │
    └── create-icons.html            # Icon generator template
                                     # (optional utility file)
```

---

## 📊 File Count Summary

- **Documentation:** 6 files
- **Configuration:** 5 files
- **Source Code:** 9 files
- **Static Assets:** 6 files
- **Total:** 26 files

---

## 🔑 Key Files Explained

### Core Application Files

**src/routes/+page.svelte** (Main Screen)
- First screen users see
- Grid of section buttons
- Filter tabs for clinics/labs
- Links to payment flow

**src/routes/payment/[id]/+page.svelte** (Payment)
- Dynamic route (id = section ID)
- Two states: before/after payment
- Triggers token generation

**src/routes/token/[number]/+page.svelte** (Token)
- Dynamic route (number = token number)
- Print-ready layout
- Queue position display

**src/routes/dashboard/+page.svelte** (Admin)
- Section CRUD operations
- Queue monitoring
- Statistics display
- Modal for add/edit

**src/lib/stores.js** (State Management)
- Manages all application state
- localStorage persistence
- Section data
- Queue data
- Token counter

### Configuration Files

**package.json**
- Dependencies: SvelteKit, Vite, Svelte
- Scripts: dev, build, preview
- Static adapter for PWA

**svelte.config.js**
- SvelteKit configuration
- Static adapter settings
- Prerendering options

**vite.config.js**
- Build tool settings
- SvelteKit plugin

### PWA Files

**static/manifest.json**
- App metadata
- Icon paths
- Display mode: standalone
- Theme color: cyan (#0891b2)

**static/sw.js**
- Caches app assets
- Enables offline mode
- Update strategy

---

## 📝 How Files Work Together

```
User visits site
    ↓
app.html loads
    ↓
+layout.svelte wraps everything
    ↓
Registers service worker (PWA)
    ↓
Loads app.css (global styles)
    ↓
Routes to +page.svelte (home)
    ↓
User clicks section
    ↓
Routes to payment/[id]/+page.svelte
    ↓
Reads section data from stores.js
    ↓
User pays & generates token
    ↓
Updates stores.js (adds to queue)
    ↓
Routes to token/[number]/+page.svelte
    ↓
Displays token, ready to print
```

---

## 💾 Data Flow

```
stores.js (State Management)
    ↓
localStorage (Browser Storage)
    ↑
All Components Read/Write
```

All data persists in browser's localStorage:
- `hospital_sections` - Section configurations
- `token_counter` - Global token number

---

## 🎨 Styling System

**app.css** defines:
- CSS custom properties (colors)
- Global resets
- Print styles
- Base typography

Each component has `<style>` sections for:
- Component-specific styles
- Scoped CSS
- Responsive breakpoints

---

## 🔄 Build Process

1. **Development:** `npm run dev`
   - Vite dev server
   - Hot module replacement
   - Instant updates

2. **Build:** `npm run build`
   - Compiles Svelte components
   - Bundles JavaScript
   - Optimizes assets
   - Outputs to `build/` folder

3. **Preview:** `npm run preview`
   - Tests production build locally
   - Verifies build works

---

## 📦 What Gets Built

After `npm run build`:

```
build/
├── index.html
├── _app/
│   ├── immutable/
│   │   ├── chunks/
│   │   ├── nodes/
│   │   └── entry/
│   └── version.json
├── manifest.json
├── sw.js
├── icons/
└── other assets
```

Deploy the entire `build/` folder to your web server!

---

This structure is optimized for:
✅ Easy maintenance
✅ Clear separation of concerns  
✅ PWA functionality
✅ Fast loading
✅ Offline capability
✅ Simple deployment
