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
      text: 'AL RAQI UNIVERSITY\n', 
      typeface: '', 
      fontSize: 30 
    });
    await plugin.printTextWithFont({ 
      text: 'HOSPITAL\n', 
      typeface: '', 
      fontSize: 30 
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
    
    // Print instructions
    await plugin.printText({ text: '================================\n' });
    await plugin.printText({ 
      text: 'INSTRUCTIONS:\n- Please wait for your number\n- Keep this token with you\n- Listen for announcements\n- If you miss your turn, inform the reception\n\n' 
    });
    await plugin.printText({ 
      text: '================================\n     Thank you for choosing\n   AL Raqi University Hospital\n\n' 
    });
    
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
