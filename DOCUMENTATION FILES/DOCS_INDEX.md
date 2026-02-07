# 📚 Documentation Index

Welcome to the AL Raqi University Hospital Token System documentation!

---

## 🚀 Getting Started

Start here if you're new to the project:

1. **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 3 steps
   - Installation guide
   - First-time setup
   - Basic usage

2. **[README.md](README.md)** - Complete project overview
   - Features and technology
   - Project structure
   - Installation details
   - User workflow
   - Default sections

---

## 📖 Core Documentation

### For Developers

**[setup.sh](setup.sh)** - Automated setup script
- Run `./setup.sh` to install dependencies automatically

**Project Configuration:**
- `package.json` - Dependencies and scripts
- `svelte.config.js` - SvelteKit configuration
- `vite.config.js` - Build tool settings

### For Users

**[FEATURES.md](FEATURES.md)** - Complete feature guide
- All screens explained
- UI component details
- Design system
- User workflows
- Accessibility features
- Performance details

---

## 🚀 Deployment

**[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- 3 deployment options (Netlify, Vercel, Traditional)
- HTTPS/SSL setup
- Server configuration (Apache, Nginx)
- PWA installation testing
- Environment configuration
- Monitoring and maintenance
- Deployment checklist

---

## 🔧 Support

**[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Fix common issues
- Development problems
- Build issues
- PWA problems
- Data issues
- UI/Display problems
- Performance issues
- Browser-specific fixes
- Emergency resets

---

## 📁 File Structure

```
hospital-token-system/
│
├── 📄 Documentation
│   ├── README.md              ← Start here
│   ├── QUICKSTART.md          ← Fast setup
│   ├── FEATURES.md            ← Feature guide
│   ├── DEPLOYMENT.md          ← Deploy guide
│   ├── TROUBLESHOOTING.md     ← Fix issues
│   └── DOCS_INDEX.md          ← This file
│
├── ⚙️ Configuration
│   ├── package.json           ← Dependencies
│   ├── svelte.config.js       ← SvelteKit config
│   ├── vite.config.js         ← Build config
│   ├── .gitignore             ← Git ignore rules
│   └── setup.sh               ← Setup script
│
├── 📱 Source Code
│   └── src/
│       ├── routes/
│       │   ├── +page.svelte              ← Home (section selection)
│       │   ├── +layout.svelte            ← Root layout
│       │   ├── +layout.js                ← Layout config
│       │   ├── payment/[id]/
│       │   │   └── +page.svelte          ← Payment screen
│       │   ├── token/[number]/
│       │   │   └── +page.svelte          ← Token display
│       │   └── dashboard/
│       │       └── +page.svelte          ← Admin dashboard
│       ├── lib/
│       │   └── stores.js                 ← State management
│       ├── app.html                      ← HTML template
│       └── app.css                       ← Global styles
│
└── 🌐 Static Assets
    └── static/
        ├── manifest.json                 ← PWA manifest
        ├── sw.js                         ← Service worker
        ├── icon-192.png                  ← App icon (small)
        ├── icon-512.png                  ← App icon (large)
        └── favicon.png                   ← Browser favicon
```

---

## 🎯 Quick Reference

### Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run setup script
./setup.sh
```

### Common Routes

- `/` - Home (section selection)
- `/payment/{id}` - Payment screen
- `/token/{number}` - Token display
- `/dashboard` - Admin panel

### Key Files to Edit

**Customize Hospital Name:**
- `src/routes/+page.svelte` (line ~28)
- `src/routes/dashboard/+page.svelte` (line ~72)
- `src/app.html` (line 6, 7)

**Customize Colors:**
- `src/app.css` (lines 17-27)

**Customize Default Sections:**
- `src/lib/stores.js` (lines 5-16)

**Customize Icons:**
- Replace `static/icon-192.png`
- Replace `static/icon-512.png`

---

## 📝 Documentation by Task

### I want to...

**Install the app:**
→ Read [QUICKSTART.md](QUICKSTART.md)

**Understand all features:**
→ Read [FEATURES.md](FEATURES.md)

**Deploy to production:**
→ Read [DEPLOYMENT.md](DEPLOYMENT.md)

**Fix a problem:**
→ Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Understand the code:**
→ Read [README.md](README.md) → Project Structure

**Customize the app:**
→ See "Key Files to Edit" above

**Learn about PWAs:**
→ Read [DEPLOYMENT.md](DEPLOYMENT.md) → HTTPS Setup & PWA Installation

---

## 🎓 Learning Path

### For Hospital Staff (Non-Technical):
1. Read [FEATURES.md](FEATURES.md) → User Workflows
2. Practice using the app
3. Keep [TROUBLESHOOTING.md](TROUBLESHOOTING.md) handy

### For Developers (New to Project):
1. [QUICKSTART.md](QUICKSTART.md) - Get it running
2. [README.md](README.md) - Understand structure
3. [FEATURES.md](FEATURES.md) - Learn UI system
4. Start coding!

### For DevOps (Deployment):
1. [README.md](README.md) - Understand app
2. [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy it
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Fix issues

---

## 🔗 External Resources

### SvelteKit Documentation:
- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte Tutorial](https://svelte.dev/tutorial)

### PWA Resources:
- [PWA Overview](https://web.dev/progressive-web-apps/)
- [Service Worker Guide](https://developers.google.com/web/fundamentals/primers/service-workers)

### Deployment Platforms:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Apache Docs](https://httpd.apache.org/)
- [Nginx Docs](https://nginx.org/en/docs/)

---

## ✅ Documentation Checklist

Before going live, ensure you've read:
- [ ] QUICKSTART.md (setup)
- [ ] README.md (overview)
- [ ] FEATURES.md (functionality)
- [ ] DEPLOYMENT.md (deployment)

Keep handy for reference:
- [ ] TROUBLESHOOTING.md
- [ ] This index file

---

## 📞 Support

If you can't find what you need in the documentation:

1. **Check the relevant doc** from the list above
2. **Search** within docs (Ctrl+F)
3. **Review code comments** in source files
4. **Check browser console** for errors
5. **Try troubleshooting guide** first

---

## 📊 Documentation Stats

- **Total Documents:** 6
- **Total Pages:** ~100+ (combined)
- **Quick Start Time:** < 5 minutes
- **Full Read Time:** ~45 minutes
- **Reference Time:** Instant (index)

---

## 🎯 Document Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| README.md | ✅ Complete | Feb 2026 |
| QUICKSTART.md | ✅ Complete | Feb 2026 |
| FEATURES.md | ✅ Complete | Feb 2026 |
| DEPLOYMENT.md | ✅ Complete | Feb 2026 |
| TROUBLESHOOTING.md | ✅ Complete | Feb 2026 |
| DOCS_INDEX.md | ✅ Complete | Feb 2026 |

---

**Happy Coding! 🚀**

Everything you need is documented. Start with QUICKSTART.md and refer back to this index as needed.
