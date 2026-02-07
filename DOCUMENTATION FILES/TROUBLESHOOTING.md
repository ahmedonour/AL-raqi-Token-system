# Troubleshooting Guide

## 🔧 Common Issues & Solutions

---

## Development Issues

### Problem: `npm install` fails

**Symptoms:**
- Errors during dependency installation
- "Cannot find module" messages

**Solutions:**
1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   ```

3. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

---

### Problem: `npm run dev` doesn't start

**Symptoms:**
- Server won't start
- Port already in use error

**Solutions:**
1. **Use different port:**
   ```bash
   npm run dev -- --port 3000
   ```

2. **Kill existing process:**
   ```bash
   # Find process using port 5173
   lsof -ti:5173 | xargs kill -9
   # Or on Windows
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

---

### Problem: Hot reload not working

**Symptoms:**
- Changes don't appear automatically
- Need to manually refresh

**Solutions:**
1. **Restart dev server:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete
   - Hard reload: Ctrl+Shift+R

---

## Build Issues

### Problem: Build fails

**Symptoms:**
- `npm run build` errors
- TypeScript errors (shouldn't happen as we use JS)

**Solutions:**
1. **Clean and rebuild:**
   ```bash
   rm -rf .svelte-kit build
   npm run build
   ```

2. **Check for syntax errors:**
   - Review recent code changes
   - Look for unclosed tags in .svelte files

---

### Problem: Build succeeds but site is broken

**Symptoms:**
- Blank page after deployment
- Console errors in browser

**Solutions:**
1. **Check base path in config:**
   - Verify `svelte.config.js` settings
   - Ensure paths are correct for your hosting

2. **Test build locally:**
   ```bash
   npm run preview
   ```

3. **Check browser console:**
   - Open DevTools (F12)
   - Look for errors in Console tab

---

## PWA Issues

### Problem: PWA won't install

**Symptoms:**
- No install prompt
- Install icon doesn't appear

**Solutions:**
1. **Verify HTTPS:**
   - PWAs require HTTPS
   - Check if you're using https://
   - localhost is exempt (http:// works)

2. **Check manifest:**
   - Open `/manifest.json` in browser
   - Verify it loads without errors
   - Check all icons exist

3. **Verify service worker:**
   - Open DevTools → Application tab
   - Check "Service Workers" section
   - Should show registered service worker

4. **Clear and re-register:**
   ```javascript
   // In browser console
   navigator.serviceWorker.getRegistrations().then(registrations => {
     registrations.forEach(r => r.unregister())
   })
   // Then refresh page
   ```

---

### Problem: Service worker not updating

**Symptoms:**
- Old version keeps loading
- Changes don't appear after deployment

**Solutions:**
1. **Hard refresh:**
   - Chrome/Edge: Ctrl+Shift+R
   - Firefox: Ctrl+F5

2. **Unregister service worker:**
   - DevTools → Application → Service Workers
   - Click "Unregister"
   - Refresh page

3. **Clear cache:**
   - DevTools → Application → Clear storage
   - Check "Unregister service workers"
   - Click "Clear site data"

---

### Problem: App not working offline

**Symptoms:**
- Offline access doesn't work
- "No internet" error shown

**Solutions:**
1. **Visit site online first:**
   - PWAs need initial online visit
   - Service worker must register first

2. **Check cache:**
   - DevTools → Application → Cache Storage
   - Verify files are cached

3. **Update service worker:**
   - Check `static/sw.js` exists
   - Verify CACHE_NAME is correct

---

## Data Issues

### Problem: Data not persisting

**Symptoms:**
- Queue resets on refresh
- Sections disappear
- Token counter resets

**Solutions:**
1. **Check localStorage:**
   ```javascript
   // In browser console
   console.log(localStorage.getItem('hospital_sections'))
   console.log(localStorage.getItem('token_counter'))
   ```

2. **Browser privacy mode:**
   - Private/Incognito mode doesn't persist data
   - Use normal browser mode

3. **Storage quota exceeded:**
   - Clear some data
   - Browser might block storage if full

---

### Problem: Data corruption

**Symptoms:**
- App crashes
- Errors when loading
- Sections show "undefined"

**Solutions:**
1. **Reset data:**
   - Go to Dashboard
   - Click "Reset All"
   - Or manually clear in DevTools:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

2. **Restore defaults:**
   - Clear localStorage
   - Refresh page
   - Default sections will load

---

## UI/Display Issues

### Problem: Styling broken

**Symptoms:**
- Layout looks wrong
- Colors missing
- Cards not rounded

**Solutions:**
1. **Clear browser cache:**
   - Hard refresh (Ctrl+Shift+R)
   - Clear all cache

2. **Check CSS loaded:**
   - DevTools → Network tab
   - Look for `app.css`
   - Verify it loads (status 200)

3. **Verify build:**
   - Rebuild the project
   - Check build output for errors

---

### Problem: Print layout broken

**Symptoms:**
- Print shows navigation
- Layout doesn't fit page
- Missing content when printing

**Solutions:**
1. **Use Print Preview:**
   - File → Print Preview
   - Check layout before printing

2. **Update browser:**
   - Older browsers may have print issues
   - Update to latest version

3. **Try different browser:**
   - Chrome usually best for printing
   - Firefox also works well

---

### Problem: Mobile layout issues

**Symptoms:**
- Text too small
- Buttons hard to tap
- Horizontal scrolling

**Solutions:**
1. **Check viewport meta tag:**
   - Should be in `src/app.html`
   - Verify: `<meta name="viewport" content="width=device-width, initial-scale=1">`

2. **Test in real device:**
   - Desktop responsive mode may differ
   - Use actual phone/tablet

3. **Check media queries:**
   - CSS should have `@media (max-width: 768px)`
   - Verify styles apply on mobile

---

## Performance Issues

### Problem: Slow loading

**Symptoms:**
- Long initial load time
- Sluggish navigation

**Solutions:**
1. **Enable caching:**
   - Service worker should cache assets
   - Check if SW registered

2. **Optimize build:**
   ```bash
   npm run build
   # Should minify automatically
   ```

3. **Check network:**
   - DevTools → Network tab
   - Look for large files
   - Verify compression enabled

---

### Problem: Queue updates lag

**Symptoms:**
- Dashboard doesn't update immediately
- Token generation slow

**Solutions:**
1. **This is normal behavior:**
   - LocalStorage operations are fast
   - No lag should exist

2. **If truly slow:**
   - Close other browser tabs
   - Clear browser cache
   - Restart browser

---

## Integration Issues

### Problem: Icons don't show

**Symptoms:**
- Missing 🏥 or 🩺 emojis
- Boxes with X instead

**Solutions:**
1. **Update system fonts:**
   - Install emoji font pack
   - Update OS

2. **Use different browser:**
   - Chrome has best emoji support
   - Firefox also good

3. **Replace with images:**
   - Edit components
   - Use PNG icons instead

---

### Problem: Can't access dashboard

**Symptoms:**
- Dashboard button doesn't work
- 404 error on /dashboard

**Solutions:**
1. **Check routing:**
   - Verify `src/routes/dashboard/+page.svelte` exists
   - Check for typos in filename

2. **Clear and rebuild:**
   ```bash
   rm -rf .svelte-kit
   npm run dev
   ```

---

## Browser-Specific Issues

### Chrome/Edge
- Usually works best
- Best PWA support
- Best print support

### Firefox
- Good overall support
- PWA installation different
- May need "Add to Home screen" extension

### Safari
- Limited PWA support on iOS
- May need manual testing
- Some features require iOS 14+

### Mobile Browsers
- Chrome Android: Full support
- Safari iOS: Limited PWA features
- Samsung Internet: Good support

---

## Getting Help

### Before Asking for Help:

1. **Check browser console:**
   - F12 → Console tab
   - Look for red errors
   - Note exact error message

2. **Try different browser:**
   - Rules out browser-specific issues

3. **Check version:**
   - Ensure you have latest code
   - Rebuild after updates

4. **Clear everything:**
   - Clear cache
   - Clear localStorage
   - Restart browser
   - Try again

### Information to Include:

- Browser and version
- Operating system
- Exact error message
- Steps to reproduce
- Screenshots if possible

---

## Emergency Fixes

### Nuclear Option (Reset Everything):

```bash
# Delete all generated files
rm -rf node_modules
rm -rf .svelte-kit
rm -rf build
rm package-lock.json

# Reinstall from scratch
npm install
npm run build
```

### Browser Reset:
1. Open DevTools (F12)
2. Application tab
3. Clear storage
4. Check all boxes
5. Click "Clear site data"
6. Close and reopen browser
7. Visit site again

---

## Prevention Tips

1. **Regular backups:**
   - Export section data periodically
   - Keep code in version control

2. **Test before deploying:**
   - Always test locally first
   - Use `npm run preview` to test build

3. **Keep dependencies updated:**
   ```bash
   npm update
   ```

4. **Monitor browser console:**
   - Check for warnings
   - Fix issues early

---

## Still Having Issues?

If none of these solutions work:

1. **Check the README** - Full documentation
2. **Review FEATURES.md** - Expected behavior
3. **Consult DEPLOYMENT.md** - Server configuration
4. **Start fresh** - Clone repo again

---

**Most issues can be solved by clearing cache and rebuilding!** 🎯
