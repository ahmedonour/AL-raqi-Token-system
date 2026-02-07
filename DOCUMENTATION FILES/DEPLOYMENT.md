# Deployment Guide - AL Raqi Hospital Token System

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18 or higher installed
- npm (comes with Node.js)
- A web server or hosting platform account

---

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended for Beginners)

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag and drop the `build` folder
   - Your site is live!

3. **Custom domain (optional):**
   - Go to Domain Settings
   - Add your custom domain
   - Follow DNS instructions

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

3. Follow the prompts to complete deployment

### Option 3: Traditional Web Server (Apache/Nginx)

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload to server:**
   - Upload entire `build` folder contents to your web root
   - Common paths:
     - Apache: `/var/www/html/`
     - Nginx: `/usr/share/nginx/html/`

3. **Configure server:**

   **For Apache (.htaccess):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **For Nginx (nginx.conf):**
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

---

## 🔒 HTTPS Setup (Required for PWA)

PWAs require HTTPS to work properly. Here are your options:

### Free SSL with Let's Encrypt

1. **Install Certbot:**
   ```bash
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. **Get certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

### Cloudflare (Free SSL)

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Update nameservers at your registrar
4. Enable "Full SSL" in Cloudflare dashboard
5. SSL is automatically applied!

---

## 📱 PWA Installation Test

After deployment, test PWA installation:

**Desktop (Chrome/Edge):**
1. Visit your deployed site
2. Look for install icon (⊕) in address bar
3. Click to install
4. App should open in standalone window

**Mobile (Android):**
1. Open site in Chrome
2. Tap menu (⋮)
3. Tap "Install app" or "Add to Home screen"
4. Confirm installation

**Mobile (iOS):**
1. Open site in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Confirm

---

## 🔧 Environment Configuration

### For Production Build

Before building, you can customize:

**1. Hospital Name:**
Edit `src/routes/+page.svelte` and `src/routes/dashboard/+page.svelte`

**2. Colors:**
Edit `src/app.css`:
```css
:root {
  --primary: #0891b2;
  --secondary: #06b6d4;
}
```

**3. Default Sections:**
Edit `src/lib/stores.js` - modify `defaultSections` array

---

## 📊 Server Requirements

### Minimum Requirements:
- **Disk Space:** 10 MB (built app is very small)
- **RAM:** 512 MB (minimal, static files only)
- **Bandwidth:** Depends on usage
- **Node.js:** Not required on server (only for building)

### Recommended:
- HTTPS/SSL certificate
- Gzip compression enabled
- CDN for faster global access

---

## 🌐 Server Configuration Examples

### Apache Configuration

**Enable required modules:**
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

**VirtualHost configuration:**
```apache
<VirtualHost *:80>
    ServerName hospital-tokens.yourdomain.com
    DocumentRoot /var/www/hospital-tokens

    <Directory /var/www/hospital-tokens>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json
    </IfModule>

    # Cache static assets
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType text/css "access plus 1 year"
    </IfModule>
</VirtualHost>
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name hospital-tokens.yourdomain.com;
    root /var/www/hospital-tokens;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Service worker - don't cache
    location = /sw.js {
        add_header Cache-Control "no-cache";
    }
}
```

---

## 🧪 Testing After Deployment

### 1. Basic Functionality
- [ ] Home page loads correctly
- [ ] Can click on sections
- [ ] Payment flow works
- [ ] Token generation works
- [ ] Token prints correctly
- [ ] Dashboard accessible
- [ ] Can add/edit/delete sections

### 2. PWA Features
- [ ] Manifest loads (check browser console)
- [ ] Service worker registers
- [ ] Install prompt appears
- [ ] App installs correctly
- [ ] Works offline (after first visit)
- [ ] Icons display correctly

### 3. Performance
- [ ] Page loads in < 2 seconds
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Print function works

---

## 🐛 Common Deployment Issues

### Issue: "Failed to fetch" errors
**Solution:** Check CORS settings and ensure service worker path is correct

### Issue: PWA won't install
**Solution:** Verify HTTPS is enabled and manifest.json is accessible

### Issue: Blank page after deployment
**Solution:** Check browser console for errors, verify all files uploaded correctly

### Issue: Routes don't work (404 errors)
**Solution:** Configure server to fallback to index.html for all routes

### Issue: Icons don't show
**Solution:** Verify icon files are in `static/` folder and paths in manifest.json are correct

---

## 📈 Monitoring & Maintenance

### Regular Tasks:
- **Weekly:** Check queue system functioning
- **Monthly:** Clear old localStorage data if needed
- **Quarterly:** Review and update section prices
- **Yearly:** Update dependencies and rebuild

### Backup Strategy:
Since data is stored in browser localStorage:
- No server-side backup needed
- Users should export data periodically
- Consider implementing export/import feature

---

## 🔄 Updating the Application

### To deploy updates:

1. **Make changes to code**
2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Build new version:**
   ```bash
   npm run build
   ```

4. **Deploy new build folder**
   - Upload to server
   - Or use platform's deployment command

5. **Users will auto-update** on next visit (thanks to service worker)

---

## 📞 Support

For deployment issues:
- Check the [SvelteKit documentation](https://kit.svelte.dev/)
- Review server logs
- Test in browser developer console

---

## ✅ Deployment Checklist

Before going live:
- [ ] Code tested thoroughly
- [ ] Production build successful
- [ ] HTTPS configured
- [ ] Domain pointed correctly
- [ ] PWA installable
- [ ] Icons loading
- [ ] Print function tested
- [ ] Mobile responsive
- [ ] Browser compatibility checked
- [ ] Default sections configured
- [ ] Hospital name customized

---

**Ready to Deploy! 🚀**

For quick start, we recommend Netlify for easiest deployment.
For full control, use traditional web server with proper configuration.
