<script>
    import { hasPrinterPermission } from '$lib/permissions';
    import { Capacitor } from '@capacitor/core';
    import { BleClient } from '@capacitor-community/bluetooth-le';

    let device;
    let deviceId; // For Capacitor
    let serviceUUID; // For Capacitor
    let characteristicUUID; // For Capacitor
    let isConnecting = false;
    let statusMessage = '';

    async function connect() {
        if (Capacitor.isNativePlatform()) {
            await connectNative();
        } else {
            await connectWeb();
        }
    }

    async function connectWeb() {
        if (!navigator.bluetooth) {
            statusMessage = 'Web Bluetooth API is not available in this browser.';
            return;
        }
        try {
            isConnecting = true;
            statusMessage = 'Requesting Bluetooth device...';
            device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });
            statusMessage = `Connecting to ${device.name}...`;
            const server = await device.gatt.connect();
            statusMessage = 'Getting service...';
            const services = await server.getPrimaryServices();
            if (services.length > 0) {
                serviceUUID = services[0].uuid;
                const service = services[0];
                statusMessage = 'Getting characteristic...';
                const characteristics = await service.getCharacteristics();
                if (characteristics.length > 0) {
                    characteristicUUID = characteristics[0].uuid;
                    statusMessage = `Connected to ${device.name}. Ready to print.`;
                } else {
                    statusMessage = 'No characteristics found.';
                }
            } else {
                statusMessage = 'No services found.';
            }
        } catch (error) {
            statusMessage = `Error: ${error.message}`;
        } finally {
            isConnecting = false;
        }
    }

    async function connectNative() {
        try {
            isConnecting = true;
            await BleClient.initialize();
            
            // Android requires location services to be enabled
            if (Capacitor.getPlatform() === 'android') {
                 const locationEnabled = await BleClient.isLocationEnabled();
                 if (!locationEnabled) {
                     statusMessage = 'Please enable location services.';
                     isConnecting = false;
                     return;
                 }
            }

            statusMessage = 'Scanning for devices...';
            // For simplicity, we connect to the first found device.
            // A real app should show a list of devices.
            const result = await BleClient.requestLEScan({}, (result) => {
                 // for now, we will just grab the first device
            });
            
            if (result.device) {
                device = result.device;
                deviceId = device.deviceId;
                statusMessage = `Connecting to ${device.name || device.deviceId}...`;
                await BleClient.connect(deviceId);
                statusMessage = 'Discovering services...';
                const services = await BleClient.getServices(deviceId);
                if (services.length > 0) {
                    serviceUUID = services[0].uuid;
                    if (services[0].characteristics.length > 0) {
                        characteristicUUID = services[0].characteristics[0].uuid;
                        statusMessage = `Connected to ${device.name}. Ready to print.`;
                    } else {
                        statusMessage = 'No characteristics found.';
                    }
                } else {
                    statusMessage = 'No services found.';
                }
            } else {
                statusMessage = 'No device found.';
            }
        } catch (error) {
            statusMessage = `Error: ${error.message}`;
        } finally {
            isConnecting = false;
        }
    }

    async function print(text) {
        if (!serviceUUID || !characteristicUUID) {
            statusMessage = 'Not connected to a printer.';
            return;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text + '\n\n\n');
            if (Capacitor.isNativePlatform()) {
                await BleClient.write(deviceId, serviceUUID, characteristicUUID, data.buffer);
            } else {
                const server = await device.gatt.connect();
                const service = await server.getPrimaryService(serviceUUID);
                const characteristic = await service.getCharacteristic(characteristicUUID);
                await characteristic.writeValue(data);
            }
            statusMessage = 'Print command sent.';
        } catch (error) {
            statusMessage = `Print error: ${error.message}`;
        }
    }

    // Expose the print function to be called from the parent
    export { print };
</script>

<div class="bluetooth-printer">
    {#if !$hasPrinterPermission}
        <p class="status">Please grant permission to use the printer.</p>
    {/if}
    {#if !device}
        <button on:click={connect} disabled={isConnecting || !$hasPrinterPermission}>
            {isConnecting ? 'Connecting...' : 'Connect to Printer'}
        </button>
    {:else}
        <p>Connected to: {device.name}</p>
    {/if}
    {#if statusMessage}
        <p class="status">{statusMessage}</p>
    {/if}
</div>

<style>
    .bluetooth-printer {
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: 0.5rem;
    }
    .status {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-light);
    }
</style>
