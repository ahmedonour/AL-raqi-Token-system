// Capacitor-based SUNMI printer wrapper
import { Capacitor } from '@capacitor/core';

let SunmiPrinter = null;

async function loadPlugin() {
  if (!SunmiPrinter && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
    const { registerPlugin } = await import('@capacitor/core');
    SunmiPrinter = registerPlugin('SunmiPrinter');
  }
  return SunmiPrinter;
}

export async function isSunmiAvailable() {
  if (!Capacitor.isNativePlatform || !Capacitor.isNativePlatform()) return false;
  
  try {
    const plugin = await loadPlugin();
    const result = await plugin.isAvailable();
    return result.available;
  } catch (err) {
    console.error('Failed to check SUNMI availability:', err);
    return false;
  }
}

export async function printToken(tokenData = {}) {
  if (!Capacitor.isNativePlatform || !Capacitor.isNativePlatform()) {
    console.log('Not on native platform, using browser print');
    window.print && window.print();
    return false;
  }

  try {
    const plugin = await loadPlugin();
    
    // Initialize printer
    await plugin.printerInit();
    
    // Print header
    await plugin.setAlignment({ alignment: 1 }); // Center
    await plugin.printTextWithFont({ 
      text: 'AL RAQI UNIVERSITY HOSPITAL', 
      typeface: '', 
      fontSize: 5 
    });
    await plugin.printText({ text: '================================\n' });
    
    // Print title
    await plugin.printTextWithFont({ 
      text: 'QUEUE TOKEN\n\n', 
      typeface: '', 
      fontSize: 24 
    });
    
    // Print token number
    await plugin.printTextWithFont({ 
      text: (tokenData.number || '') + '\n', 
      typeface: '', 
      fontSize: 60 
    });
    await plugin.printText({ text: '\n================================\n' });
    
    // Print details (left aligned)
    await plugin.setAlignment({ alignment: 0 }); // Left
    await plugin.printText({ text: `Section: ${tokenData.section || '-'}\n` });
    await plugin.printText({ text: `Type: ${tokenData.type || '-'}\n` });
    await plugin.printText({ text: `Fee Paid: ${tokenData.fee || '-'}\n\n` });
    await plugin.printText({ text: `Date: ${tokenData.date || '-'}\n` });
    await plugin.printText({ text: `Time: ${tokenData.time || '-'}\n\n` });
    await plugin.printText({ 
      text: `Queue Position: ${tokenData.position || '-'} / ${tokenData.total || '-'}\n\n` 
    });
    
    // Footer: two compact lines (shortened) — small readable font
    await plugin.printText({ text: '================================\n' });
    const footerLine1 = 'Thank you for choosing AL Raqi University Hospital';
    // const footerLine2 = 'For emergencies, please contact …';
    if (plugin.printTextWithFont) {
      try {
        await plugin.printTextWithFont({ text: footerLine1 + '\n', typeface: '', fontSize: 5 });
        // await plugin.printTextWithFont({ text: footerLine2 + '\n\n', typeface: '', fontSize: 10 });
      } catch (e) {
        await plugin.printText({ text: footerLine1 + '\n' });
        // await plugin.printText({ text: footerLine2 + '\n\n' });
      }
    } else {
      await plugin.printText({ text: footerLine1 + '\n' });
    //   await plugin.printText({ text: footerLine2 + '\n\n' });
    }
    
    // Feed and cut
    await plugin.lineWrap({ lines: 3 });
    await plugin.cutPaper();
    
    return true;
  } catch (err) {
    console.error('SUNMI printer error:', err);
    // Fallback to browser print
    window.print && window.print();
    return false;
  }
}

export async function checkPrinterStatus() {
  if (!Capacitor.isNativePlatform || !Capacitor.isNativePlatform()) {
    return { available: false, platform: 'web' };
  }
  
  try {
    const plugin = await loadPlugin();
    const available = await plugin.isAvailable();
    const status = await plugin.getPrinterStatus();
    
    return {
      available: available.available,
      status: status.status,
      platform: Capacitor.getPlatform()
    };
  } catch (err) {
    return {
      available: false,
      error: String(err),
      platform: Capacitor.getPlatform()
    };
  }
}

export default { isSunmiAvailable, printToken, checkPrinterStatus };
