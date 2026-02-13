<script>
  import { SunmiPrinter } from '@kduma-autoid/capacitor-sunmi-printer';

  async function printK2Receipt() {
    try {
      // 1. Center alignment
      await SunmiPrinter.setAlignment({ alignment: 'CENTER' });
      
      // 2. Print Header
      await SunmiPrinter.printText({ content: "KIOSK ORDER #55
", is_bold: true });
      
      // 3. Print content
      await SunmiPrinter.printText({ content: "1x Burger Combo
1x Large Soda
" });
      
      // 4. Feed and Cut (Crucial for K2 Kiosk)
      await SunmiPrinter.lineWrap({ lines: 3 });
      await SunmiPrinter.cutPaper(); 
      
      alert("Receipt Printed!");
    } catch (err) {
      console.error("Print failed", err);
    }
  }
</script>

<button on:click={printK2Receipt} class="kiosk-button">
  Print Receipt
</button>
