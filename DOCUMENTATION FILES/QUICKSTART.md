# Quick Start Guide - AL Raqi Hospital Token System

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

Or use the setup script:
```bash
./setup.sh
```

### Step 2: Start Development Server
```bash
npm run dev
```

Your app will be running at `http://localhost:5173`

### Step 3: Open in Browser
Navigate to `http://localhost:5173` and start using the system!

---

## 📱 First Time Using the App?

### For Patients:
1. **Click a Section** - Choose your desired clinic or laboratory
2. **Click "Pay"** - See the price and proceed to payment
3. **Click "Payed"** - After manual payment at cashier
4. **Click "Generate Token"** - Get your queue number
5. **Print** - Print your token and wait for your number

### For Administrators:
1. **Click "Dashboard"** button (top right)
2. **View Statistics** - See total sections, queues, and revenue
3. **Manage Sections** - Add/Edit/Delete sections as needed
4. **Monitor Queues** - See real-time queue status

---

## 🔧 Common Tasks

### Add a New Section
1. Go to Dashboard
2. Click "+ Add Section"
3. Fill in: Name, Type (clinic/laboratory), Price
4. Click "Add Section"

### Edit Section Price
1. Go to Dashboard
2. Find section in table
3. Click "Edit"
4. Change price
5. Click "Update Section"

### Remove Patient from Queue
1. Go to Dashboard
2. Click "Queue Monitor" tab
3. Find patient token
4. Click "✕" button

### Reset Everything
1. Go to Dashboard
2. Click "Reset All" (careful - this clears all data!)

---

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `build/` directory.

### Deploy to Web Server
Upload contents of `build/` folder to your web server.

### Recommended Servers:
- **Netlify**: Drag & drop the `build` folder
- **Vercel**: Connect your Git repository
- **Apache/Nginx**: Copy to web root directory

---

## 🌐 PWA Features

Once deployed, users can install the app:

**On Mobile:**
- Android: "Add to Home Screen" from browser menu
- iOS: Safari → Share → "Add to Home Screen"

**On Desktop:**
- Look for install icon in address bar
- Click to install as standalone app

---

## 💾 Data Storage

All data is stored locally in the browser:
- Sections configuration
- Queue information
- Token numbers

**⚠️ Important:** Data is per-browser. Clearing browser data will reset the system.

---

## 🎨 Customization

### Change Colors
Edit `/src/app.css`:
```css
:root {
	--primary: #0891b2;        /* Main color */
	--primary-dark: #0e7490;   /* Hover color */
	--secondary: #06b6d4;      /* Accent color */
}
```

### Change Hospital Name
Edit `/src/routes/+page.svelte`:
```svelte
<h1>AL Raqi University Hospital</h1>
```

---

## 🐛 Troubleshooting

### Port Already in Use?
```bash
npm run dev -- --port 3000
```

### Dependencies Won't Install?
```bash
rm -rf node_modules package-lock.json
npm install
```

### PWA Not Working?
- Check if you're using HTTPS (required for PWA)
- Clear browser cache
- Re-register service worker

---

## 📞 Need Help?

Check the full README.md for detailed documentation.

---

**Happy Token Managing! 🏥**
