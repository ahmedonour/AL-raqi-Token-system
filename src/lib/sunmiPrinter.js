// Lightweight SUNMI printer wrapper with browser fallback
export function isSunmiAvailable() {
  return typeof window !== 'undefined' && !!(window.sunmi && window.sunmi.printer);
}

export async function printToken(tokenData = {}) {
  if (typeof window === 'undefined') return false;

  if (isSunmiAvailable()) {
    try {
      const p = window.sunmi.printer;
      // initialize
      p.printerInit && p.printerInit();

      // Header
      p.setAlignment && p.setAlignment(1);
      p.printTextWithFont && p.printTextWithFont('AL RAQI UNIVERSITY\nHOSPITAL\n', '', 30, true);
      p.printText && p.printText('================================\n');

      // Title
      p.printTextWithFont && p.printTextWithFont('QUEUE TOKEN\n\n', '', 24, true);

      // Token number big
      p.setAlignment && p.setAlignment(1);
      p.printTextWithFont && p.printTextWithFont((tokenData.number || '') + '\n', '', 60, true);
      p.printText && p.printText('\n================================\n');

      // Details (left aligned)
      p.setAlignment && p.setAlignment(0);
      p.printText && p.printText(`Section: ${tokenData.section || '-'}\n`);
      p.printText && p.printText(`Type: ${tokenData.type || '-'}\n`);
      p.printText && p.printText(`Fee Paid: ${tokenData.fee || '-'}\n\n`);

      p.printText && p.printText(`Date: ${tokenData.date || '-'}\n`);
      p.printText && p.printText(`Time: ${tokenData.time || '-'}\n\n`);

      p.printText && p.printText(`Queue Position: ${tokenData.position || '-'} / ${tokenData.total || '-'}\n\n`);

      p.printText && p.printText('================================\n');
      p.printText && p.printText('INSTRUCTIONS:\n- Please wait for your number\n- Keep this token with you\n- Listen for announcements\n- If you miss your turn, inform the reception\n\n');
      p.printText && p.printText('================================\n     Thank you for choosing\n   AL Raqi University Hospital\n\n');

      // Feed and cut
      p.lineWrap && p.lineWrap(3);
      p.cutPaper && p.cutPaper();

      return true;
    } catch (err) {
      console.error('SUNMI printer error:', err);
      // fallback to browser print
      window.print && window.print();
      return false;
    }
  }

  // Not a SUNMI device — fallback
  window.print && window.print();
  return false;
}

export default { isSunmiAvailable, printToken };
