<script>
  import { onMount, onDestroy } from 'svelte';
  import { CapacitorThermalPrinter } from 'capacitor-thermal-printer';
  import { BleClient } from '@capacitor-community/bluetooth-le';
  import { Permissions } from '@capacitor/core';

  let printStatus = 'Idle';
  let deviceAddress = ''; // Replace with your printer's address or discovered device ID
  let bluetoothStatus = 'Unknown';
  let discoveredDevices = [];

  // --- Permission Handling ---
  async function checkAndRequestBluetoothPermissions() {
    printStatus = 'Checking Bluetooth permissions...';
    try {
      // Check BLUETOOTH_SCAN (Android 12+)
      let scanStatus = await Permissions.check({ name: 'bluetoothScan' });
      if (scanStatus.state !== 'granted') {
        scanStatus = await Permissions.request({ name: 'bluetoothScan' });
      }

      // Check BLUETOOTH_CONNECT (Android 12+)
      let connectStatus = await Permissions.check({ name: 'bluetoothConnect' });
      if (connectStatus.state !== 'granted') {
        connectStatus = await Permissions.request({ name: 'bluetoothConnect' });
      }

      // Check ACCESS_FINE_LOCATION (for older Android or when BLUETOOTH_SCAN is not enough)
      let locationStatus = await Permissions.check({ name: 'location' });
      if (locationStatus.state !== 'granted') {
         locationStatus = await Permissions.request({ name: 'location' });
      }

      if (scanStatus.state === 'granted' && connectStatus.state === 'granted' && locationStatus.state === 'granted') {
        bluetoothStatus = 'Permissions Granted';
        return true;
      } else {
        bluetoothStatus = 'Permissions Denied';
        return false;
      }
    } catch (e) {
      console.error('Error checking/requesting permissions:', e);
      bluetoothStatus = 'Permission Error';
      return false;
    }
  }

  // --- Bluetooth State Handling ---
  async function checkBluetoothState() {
    try {
      const enabled = await BleClient.isEnabled();
      if (enabled) {
        bluetoothStatus = 'Bluetooth Enabled';
      } else {
        bluetoothStatus = 'Bluetooth Disabled. Please enable in device settings.';
        // Attempt to enable Bluetooth (might require user interaction)
        await BleClient.enable();
      }
    } catch (e) {
      console.error('Error checking Bluetooth state:', e);
      bluetoothStatus = 'Error checking Bluetooth';
    }
  }

  // --- Printer Functions ---
  async function scanForPrinters() {
    printStatus = 'Scanning for printers...';
    discoveredDevices = [];
    try {
      await checkBluetoothState(); // Ensure Bluetooth is enabled
      if (bluetoothStatus.includes('Enabled')) {
        CapacitorThermalPrinter.addListener('discoverDevices', (devices) => {
          console.log('Discovered devices list:', devices);
          // Assuming devices is an array of { name: string, address: string }
          discoveredDevices = devices;
          printStatus = `Found ${devices.length} devices.`;
        });
        await CapacitorThermalPrinter.startScan();
        setTimeout(() => CapacitorThermalPrinter.stopScan(), 10000); // Scan for 10 seconds
      } else {
        printStatus = bluetoothStatus;
      }
    } catch (e) {
      console.error('Scanning error:', e);
      printStatus = `Scanning error: ${e.message}`;
    }
  }

  async function connectToPrinter(address) {
    printStatus = `Connecting to ${address}...`;
    try {
      const device = await CapacitorThermalPrinter.connect({ address });
      if (device && device.address) {
        deviceAddress = device.address; // Store the connected device address
        printStatus = `Connected to ${device.name || device.address}`;
        return true;
      } else {
        printStatus = 'Failed to connect to printer!';
        return false;
      }
    } catch (e) {
      console.error('Connection error:', e);
      printStatus = `Connection error: ${e.message}`;
      return false;
    }
  }

  async function printSampleReceipt() {
    printStatus = 'Printing sample receipt...';
    if (!deviceAddress) {
      printStatus = 'No printer connected. Scan and connect first.';
      alert(printStatus);
      return;
    }

    try {
      await CapacitorThermalPrinter.begin()
        .align('center')
        // .image('https://raw.githubusercontent.com/Malik12tree/capacitor-thermal-printer/main/assets/Logo-Black.png') // Uncomment to add image, needs internet perm
        .bold()
        .underline()
        .text('The amazing store
')
        .doubleWidth()
        .text('RECEIPT
')
        .text('--------------------------------
')
        .align('left')
        .text('Item 1         $10.00
')
        .text('Item 2         $20.50
')
        .text('--------------------------------
')
        .text('Total:         $30.50
')
        .text('Thank you for your purchase!
')
        .feed(3) // Feed paper 3 lines
        .cut() // Cut the paper
        .end();

      printStatus = 'Printing complete!';
      alert(printStatus);
    } catch (e) {
      console.error('Printing error:', e);
      printStatus = `Printing error: ${e.message}`;
      alert(printStatus);
    }
  }

  onMount(async () => {
    await checkAndRequestBluetoothPermissions();
    await checkBluetoothState();
    // Initialize BleClient with androidNeverForLocation if permissions are granted
    if (bluetoothStatus.includes('Granted') && bluetoothStatus.includes('Enabled')) {
      await BleClient.initialize({ androidNeverForLocation: true });
    }
  });

  onDestroy(() => {
    CapacitorThermalPrinter.removeAllListeners();
    BleClient.destroy();
  });
</script>

<div class="thermal-printer-example">
  <h2>Thermal Printer Example</h2>
  <p>Status: {printStatus}</p>
  <p>Bluetooth: {bluetoothStatus}</p>

  <button on:click={checkAndRequestBluetoothPermissions}>Check/Request Permissions</button>
  <button on:click={checkBluetoothState}>Check Bluetooth State</button>
  <button on:click={scanForPrinters}>Scan for Printers</button>

  {#if discoveredDevices.length > 0}
    <h3>Discovered Devices:</h3>
    <ul>
      {#each discoveredDevices as device}
        <li>
          {device.name || 'Unknown'} ({device.address})
          <button on:click={() => connectToPrinter(device.address)}>Connect</button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if deviceAddress}
    <p>Connected to: {deviceAddress}</p>
    <button on:click={printSampleReceipt}>Print Sample Receipt</button>
  {/if}
</div>

<style>
  .thermal-printer-example {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-top: 1rem;
    background-color: #f0f8ff;
  }
  .thermal-printer-example button {
    margin: 0.5rem;
    padding: 0.8rem 1.2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .thermal-printer-example button:hover {
    background-color: #0056b3;
  }
</style>
