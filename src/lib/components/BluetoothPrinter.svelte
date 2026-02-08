<script>
    let device;
    let characteristic;
    let isConnecting = false;
    let statusMessage = '';

    async function connect() {
        if (!navigator.bluetooth) {
            statusMessage = 'Web Bluetooth API is not available in this browser.';
            return;
        }

        try {
            isConnecting = true;
            statusMessage = 'Requesting Bluetooth device...';

            device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true, // For now, accept all devices to see what's available
                // A more specific filter would be better, but service UUIDs for printers vary.
                // optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb'] // Generic printer service
            });

            statusMessage = `Connecting to ${device.name}...`;
            const server = await device.gatt.connect();

            // For now, let's assume we get a service and characteristic.
            // This will need to be made more robust.
            statusMessage = 'Getting service...';
            const services = await server.getPrimaryServices();
            if (services.length > 0) {
                const service = services[0];
                statusMessage = 'Getting characteristic...';
                const characteristics = await service.getCharacteristics();
                if (characteristics.length > 0) {
                    characteristic = characteristics[0];
                    statusMessage = `Connected to ${device.name}. Ready to print.`;
                } else {
                    statusMessage = 'No characteristics found for this service.';
                }
            } else {
                statusMessage = 'No services found for this device.';
            }

        } catch (error) {
            statusMessage = `Error: ${error.message}`;
        } finally {
            isConnecting = false;
        }
    }

    async function print(text) {
        if (!characteristic) {
            statusMessage = 'Not connected to a printer.';
            return;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text + '\n\n\n'); // Add some newlines to eject paper            await characteristic.writeValue(data);
            statusMessage = 'Print command sent.';
        } catch (error) {
            statusMessage = `Print error: ${error.message}`;
        }
    }

    // Expose the print function to be called from the parent
    export { print };
</script>

<div class="bluetooth-printer">
    {#if !device}
        <button on:click={connect} disabled={isConnecting}>
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
