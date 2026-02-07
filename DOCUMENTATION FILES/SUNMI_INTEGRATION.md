# SUNMI Printer Integration (Reference: SunmiPrinterDemo)

This document describes how to integrate SUNMI native printing into the web app when packaging as an Android app (Capacitor/Cordova) and how to test locally using a mocked `window.sunmi` object.

Reference repository: https://github.com/shangmisunmi/SunmiPrinterDemo

Overview
- The SUNMI device exposes a native printing SDK. `SunmiPrinterDemo` demonstrates native Android usage and includes Java examples for calling the Sunmi printer service.
- For a web app packaged as an Android APK (Capacitor), you must add a native bridge (Java/Kotlin) that exposes printing methods to JavaScript (e.g. via a Capacitor plugin or a WebView JavaScriptInterface).

Quick integration steps (Capacitor)
1. Build the web app:
   ```bash
   npm run build
   npx cap init  # if not already initialized
   npx cap add android
   npx cap copy
   npx cap sync android
   ```

2. Open Android project:
   ```bash
   npx cap open android
   ```

3. Add Sunmi SDK / example
- Clone `SunmiPrinterDemo` locally and inspect the Java classes that interact with the Sunmi printer service. Copy the necessary classes (printer helper, AIDL/service usage) into your Android app module (typically `app/src/main/java/...`).
- The example uses Sunmi's SDK and AIDL; follow the repo to include any required AIDL files or libs.

4. Create a JS bridge
- Option A: Capacitor plugin (recommended)
  - Create a Capacitor plugin that wraps native printing methods (`printerInit`, `setAlignment`, `printText`, `printTextWithFont`, `lineWrap`, `cutPaper`, `printBitmap`, `printQRCode`).
  - Capacitor docs: https://capacitorjs.com/docs/plugins/building-plugins

- Option B: WebView JavaScriptInterface (quicker)
  - In `MainActivity` locate the `WebView` and add a JavaScript interface object exposing printing methods:

```java
public class SunmiBridge {
    Context ctx;
    SunmiBridge(Context ctx){ this.ctx = ctx; }

    @JavascriptInterface
    public void printText(String text){
        // call sunmi printer helper to print text
    }

    // add more methods: printTextWithFont, setAlignment, lineWrap, cutPaper, etc.
}

webView.addJavascriptInterface(new SunmiBridge(this), "sunmi");
```

5. Permissions and manifest
- If the Sunmi SDK requires special permissions, add them to `AndroidManifest.xml` per the example repo.

6. Build and install on SUNMI device
   ```bash
   npx cap copy android
   npx cap open android
   # Build from Android Studio or use gradle
   ```

7. From JavaScript (web app) the plugin / interface should expose `window.sunmi.printer` with methods used in `src/lib/sunmiPrinter.js`.

Notes and tips
- The `SunmiPrinterDemo` repo contains ready-to-read native Java code—use it as a direct reference rather than copying blindly. Pay attention to package names and imports.
- For quicker testing, create a small JS `SunmiBridge` (see Option B) that logs calls to `Logcat` and returns success — then wire the `window.sunmi` object to call those methods.
- If you use the Capacitor plugin approach, prefer to expose high-level methods (e.g., `printReceipt(json)`) and keep formatting logic in JavaScript.

Local dev testing
- Use the included test page `src/routes/print-test/+page.svelte` to mock `window.sunmi` and exercise the wrapper locally. When you install the Android native bridge on the device the real `window.sunmi` will be used automatically.

Further reading
- Sunmi Developer Portal: https://developer.sunmi.com/
- SunmiPrinterDemo (Github): https://github.com/shangmisunmi/SunmiPrinterDemo
