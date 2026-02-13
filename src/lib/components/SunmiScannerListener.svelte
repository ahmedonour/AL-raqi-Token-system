<script>
  import { onMount, onDestroy } from 'svelte';

  let scannedData = 'No scan data yet.';

  function handleScanEvent(event) {
    if (event.detail && event.detail.data) {
      scannedData = event.detail.data;
      console.log('Scanned Data:', scannedData);
      alert('Scanned: ' + scannedData);
    } else if (event.data) { // Some Sunmi devices might send data directly in event.data
      scannedData = event.data;
      console.log('Scanned Data:', scannedData);
      alert('Scanned: ' + scannedData);
    } else {
        console.log('Unknown scan event format:', event);
    }
  }

  onMount(() => {
    // This event name is specific to SUNMI scanners in broadcast mode
    // The actual event structure might vary slightly, common patterns are event.detail.data or event.data
    window.addEventListener('com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED', handleScanEvent);
  });

  onDestroy(() => {
    window.removeEventListener('com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED', handleScanEvent);
  });
</script>

<div class="sunmi-scanner-listener">
  <h2>SUNMI QR Scanner Listener</h2>
  <p>Place this component anywhere in your app to listen for QR code scans from the SUNMI K2 device configured in broadcast mode.</p>
  <p><strong>Last Scanned Data:</strong> {scannedData}</p>
</div>

<style>
  .sunmi-scanner-listener {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-top: 1rem;
    background-color: #f9f9f9;
  }
  .sunmi-scanner-listener h2 {
    color: #333;
  }
  .sunmi-scanner-listener strong {
    color: #007bff;
  }
</style>
