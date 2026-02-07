<script>
  import { onMount } from 'svelte';
  import { printToken as sunmiPrint, isSunmiAvailable } from '$lib/sunmiPrinter.js';

  let mocked = false;

  function setupMock() {
    if (typeof window === 'undefined') return;
    if (!window.sunmi) window.sunmi = {};
    window.sunmi.printer = {
      printerInit: () => console.log('mock: printerInit'),
      setAlignment: (a) => console.log('mock: setAlignment', a),
      printTextWithFont: (txt, font, size, bold) => console.log('mock: printTextWithFont', txt, size, bold),
      printText: (txt) => console.log('mock: printText', txt),
      lineWrap: (n) => console.log('mock: lineWrap', n),
      cutPaper: () => console.log('mock: cutPaper'),
      printQRCode: (txt, size, level) => console.log('mock: printQRCode', txt)
    };
    mocked = true;
  }

  async function testPrint() {
    const now = new Date();
    const tokenData = {
      number: 42,
      section: 'Cardiology',
      type: 'Clinic',
      fee: 150,
      date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: now.toLocaleTimeString('en-US'),
      position: 3,
      total: 5
    };

    await sunmiPrint(tokenData);
    alert('Print function invoked (check console).');
  }

  onMount(() => {
    // For convenience, auto-mock in dev if sunmi is not present
    if (typeof window !== 'undefined' && !isSunmiAvailable()) {
      console.log('No SUNMI detected — using mock printer.');
      setupMock();
    }
  });
</script>

<div style="padding:1rem">
  <h2>SUNMI Print Test</h2>
  <p>Use this page to test the print wrapper locally. In production on a SUNMI device the native bridge will be used.</p>

  <div style="display:flex;gap:8px;">
    <button on:click={setupMock}>Mock SUNMI Printer</button>
    <button on:click={testPrint}>Test Print</button>
  </div>

  <p style="margin-top:1rem">Mocked: {mocked ? 'yes' : 'no'}</p>
</div>
