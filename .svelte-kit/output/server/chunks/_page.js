import { s as subscribe } from "./utils2.js";
import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { p as page } from "./stores.js";
import { s as sections } from "./stores2.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
import { $ as $format } from "./runtime.js";
import { h as hasPrinterPermission } from "./permissions.js";
import { registerPlugin, Capacitor } from "@capacitor/core";
import { e as escape } from "./escape.js";
var ScanMode;
(function(ScanMode2) {
  ScanMode2[ScanMode2["SCAN_MODE_LOW_POWER"] = 0] = "SCAN_MODE_LOW_POWER";
  ScanMode2[ScanMode2["SCAN_MODE_BALANCED"] = 1] = "SCAN_MODE_BALANCED";
  ScanMode2[ScanMode2["SCAN_MODE_LOW_LATENCY"] = 2] = "SCAN_MODE_LOW_LATENCY";
})(ScanMode || (ScanMode = {}));
var ConnectionPriority;
(function(ConnectionPriority2) {
  ConnectionPriority2[ConnectionPriority2["CONNECTION_PRIORITY_BALANCED"] = 0] = "CONNECTION_PRIORITY_BALANCED";
  ConnectionPriority2[ConnectionPriority2["CONNECTION_PRIORITY_HIGH"] = 1] = "CONNECTION_PRIORITY_HIGH";
  ConnectionPriority2[ConnectionPriority2["CONNECTION_PRIORITY_LOW_POWER"] = 2] = "CONNECTION_PRIORITY_LOW_POWER";
})(ConnectionPriority || (ConnectionPriority = {}));
function numbersToDataView(value) {
  return new DataView(Uint8Array.from(value).buffer);
}
function dataViewToNumbers(value) {
  return Array.from(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
}
function numberToUUID(value) {
  return `0000${value.toString(16).padStart(4, "0")}-0000-1000-8000-00805f9b34fb`;
}
function hexStringToDataView(hex) {
  const bin = [];
  let i, c, isEmpty = 1, buffer = 0;
  for (i = 0; i < hex.length; i++) {
    c = hex.charCodeAt(i);
    if (c > 47 && c < 58 || c > 64 && c < 71 || c > 96 && c < 103) {
      buffer = buffer << 4 ^ (c > 64 ? c + 9 : c) & 15;
      if (isEmpty ^= 1) {
        bin.push(buffer & 255);
      }
    }
  }
  return numbersToDataView(bin);
}
function dataViewToHexString(value) {
  return dataViewToNumbers(value).map((n) => {
    let s = n.toString(16);
    if (s.length == 1) {
      s = "0" + s;
    }
    return s;
  }).join("");
}
function webUUIDToString(uuid) {
  if (typeof uuid === "string") {
    return uuid;
  } else if (typeof uuid === "number") {
    return numberToUUID(uuid);
  } else {
    throw new Error("Invalid UUID");
  }
}
function mapToObject(map) {
  const obj = {};
  if (!map) {
    return void 0;
  }
  map.forEach((value, key) => {
    obj[key.toString()] = value;
  });
  return obj;
}
function toUint8Array(value) {
  if (value === void 0) {
    return void 0;
  }
  if (typeof value === "string") {
    const dataView = hexStringToDataView(value);
    return new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength);
  }
  if (value instanceof DataView) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  return value;
}
function toHexString(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value instanceof DataView) {
    return dataViewToHexString(value);
  }
  return dataViewToHexString(new DataView(value.buffer, value.byteOffset, value.byteLength));
}
function toArrayBufferDataView(value) {
  if (typeof SharedArrayBuffer !== "undefined" && value.buffer instanceof SharedArrayBuffer) {
    const uint8Array = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    const buffer = uint8Array.slice().buffer;
    return new DataView(buffer);
  }
  return value;
}
const BluetoothLe = registerPlugin("BluetoothLe", {
  web: () => import("./web.js").then((m) => new m.BluetoothLeWeb())
});
const makeQueue = () => {
  let currentTask = Promise.resolve();
  return (fn) => new Promise((resolve, reject) => {
    currentTask = currentTask.then(() => fn()).then(resolve).catch(reject);
  });
};
function getQueue(enabled) {
  if (enabled) {
    return makeQueue();
  }
  return (fn) => fn();
}
function parseUUID(uuid) {
  if (typeof uuid !== "string") {
    throw new Error(`Invalid UUID type ${typeof uuid}. Expected string.`);
  }
  uuid = uuid.toLowerCase();
  const is128BitUuid = uuid.search(/^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/) >= 0;
  if (!is128BitUuid) {
    throw new Error(`Invalid UUID format ${uuid}. Expected 128 bit string (e.g. "0000180d-0000-1000-8000-00805f9b34fb").`);
  }
  return uuid;
}
class BleClientClass {
  constructor() {
    this.scanListener = null;
    this.eventListeners = /* @__PURE__ */ new Map();
    this.queue = getQueue(true);
  }
  enableQueue() {
    this.queue = getQueue(true);
  }
  disableQueue() {
    this.queue = getQueue(false);
  }
  async initialize(options) {
    await this.queue(async () => {
      await BluetoothLe.initialize(options);
    });
  }
  async isEnabled() {
    const enabled = await this.queue(async () => {
      const result = await BluetoothLe.isEnabled();
      return result.value;
    });
    return enabled;
  }
  async requestEnable() {
    await this.queue(async () => {
      await BluetoothLe.requestEnable();
    });
  }
  async enable() {
    await this.queue(async () => {
      await BluetoothLe.enable();
    });
  }
  async disable() {
    await this.queue(async () => {
      await BluetoothLe.disable();
    });
  }
  async startEnabledNotifications(callback) {
    await this.queue(async () => {
      var _a;
      const key = `onEnabledChanged`;
      await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
      const listener = await BluetoothLe.addListener(key, (result) => {
        callback(result.value);
      });
      this.eventListeners.set(key, listener);
      await BluetoothLe.startEnabledNotifications();
    });
  }
  async stopEnabledNotifications() {
    await this.queue(async () => {
      var _a;
      const key = `onEnabledChanged`;
      await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
      this.eventListeners.delete(key);
      await BluetoothLe.stopEnabledNotifications();
    });
  }
  async isLocationEnabled() {
    const enabled = await this.queue(async () => {
      const result = await BluetoothLe.isLocationEnabled();
      return result.value;
    });
    return enabled;
  }
  async openLocationSettings() {
    await this.queue(async () => {
      await BluetoothLe.openLocationSettings();
    });
  }
  async openBluetoothSettings() {
    await this.queue(async () => {
      await BluetoothLe.openBluetoothSettings();
    });
  }
  async openAppSettings() {
    await this.queue(async () => {
      await BluetoothLe.openAppSettings();
    });
  }
  async setDisplayStrings(displayStrings) {
    await this.queue(async () => {
      await BluetoothLe.setDisplayStrings(displayStrings);
    });
  }
  async requestDevice(options) {
    options = options ? this.validateRequestBleDeviceOptions(options) : void 0;
    const result = await this.queue(async () => {
      const device = await BluetoothLe.requestDevice(options);
      return device;
    });
    return result;
  }
  async requestLEScan(options, callback) {
    options = this.validateRequestBleDeviceOptions(options);
    await this.queue(async () => {
      var _a;
      await ((_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove());
      this.scanListener = await BluetoothLe.addListener("onScanResult", (resultInternal) => {
        const result = Object.assign(Object.assign({}, resultInternal), { manufacturerData: this.convertObject(resultInternal.manufacturerData), serviceData: this.convertObject(resultInternal.serviceData), rawAdvertisement: resultInternal.rawAdvertisement ? this.convertValue(resultInternal.rawAdvertisement) : void 0 });
        callback(result);
      });
      await BluetoothLe.requestLEScan(options);
    });
  }
  async stopLEScan() {
    await this.queue(async () => {
      var _a;
      await ((_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove());
      this.scanListener = null;
      await BluetoothLe.stopLEScan();
    });
  }
  async getDevices(deviceIds) {
    if (!Array.isArray(deviceIds)) {
      throw new Error("deviceIds must be an array");
    }
    return this.queue(async () => {
      const result = await BluetoothLe.getDevices({ deviceIds });
      return result.devices;
    });
  }
  async getConnectedDevices(services) {
    if (!Array.isArray(services)) {
      throw new Error("services must be an array");
    }
    services = services.map(parseUUID);
    return this.queue(async () => {
      const result = await BluetoothLe.getConnectedDevices({ services });
      return result.devices;
    });
  }
  async getBondedDevices() {
    return this.queue(async () => {
      const result = await BluetoothLe.getBondedDevices();
      return result.devices;
    });
  }
  async connect(deviceId, onDisconnect, options) {
    await this.queue(async () => {
      var _a;
      if (onDisconnect) {
        const key = `disconnected|${deviceId}`;
        await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
        const listener = await BluetoothLe.addListener(key, () => {
          onDisconnect(deviceId);
        });
        this.eventListeners.set(key, listener);
      }
      await BluetoothLe.connect(Object.assign({ deviceId }, options));
    });
  }
  async createBond(deviceId, options) {
    await this.queue(async () => {
      await BluetoothLe.createBond(Object.assign({ deviceId }, options));
    });
  }
  async isBonded(deviceId) {
    const isBonded = await this.queue(async () => {
      const result = await BluetoothLe.isBonded({ deviceId });
      return result.value;
    });
    return isBonded;
  }
  async disconnect(deviceId) {
    await this.queue(async () => {
      await BluetoothLe.disconnect({ deviceId });
    });
  }
  async getServices(deviceId) {
    const services = await this.queue(async () => {
      const result = await BluetoothLe.getServices({ deviceId });
      return result.services;
    });
    return services;
  }
  async discoverServices(deviceId) {
    await this.queue(async () => {
      await BluetoothLe.discoverServices({ deviceId });
    });
  }
  async getMtu(deviceId) {
    const value = await this.queue(async () => {
      const result = await BluetoothLe.getMtu({ deviceId });
      return result.value;
    });
    return value;
  }
  async requestConnectionPriority(deviceId, connectionPriority) {
    await this.queue(async () => {
      await BluetoothLe.requestConnectionPriority({ deviceId, connectionPriority });
    });
  }
  async readRssi(deviceId) {
    const value = await this.queue(async () => {
      const result = await BluetoothLe.readRssi({ deviceId });
      return parseFloat(result.value);
    });
    return value;
  }
  async read(deviceId, service, characteristic, options) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    const value = await this.queue(async () => {
      const result = await BluetoothLe.read(Object.assign({
        deviceId,
        service,
        characteristic
      }, options));
      return this.convertValue(result.value);
    });
    return value;
  }
  async write(deviceId, service, characteristic, value, options) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    return this.queue(async () => {
      if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
        throw new Error("Invalid data.");
      }
      let writeValue = value;
      if (Capacitor.getPlatform() !== "web") {
        writeValue = dataViewToHexString(value);
      }
      await BluetoothLe.write(Object.assign({
        deviceId,
        service,
        characteristic,
        value: writeValue
      }, options));
    });
  }
  async writeWithoutResponse(deviceId, service, characteristic, value, options) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    await this.queue(async () => {
      if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
        throw new Error("Invalid data.");
      }
      let writeValue = value;
      if (Capacitor.getPlatform() !== "web") {
        writeValue = dataViewToHexString(value);
      }
      await BluetoothLe.writeWithoutResponse(Object.assign({
        deviceId,
        service,
        characteristic,
        value: writeValue
      }, options));
    });
  }
  async readDescriptor(deviceId, service, characteristic, descriptor, options) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    descriptor = parseUUID(descriptor);
    const value = await this.queue(async () => {
      const result = await BluetoothLe.readDescriptor(Object.assign({
        deviceId,
        service,
        characteristic,
        descriptor
      }, options));
      return this.convertValue(result.value);
    });
    return value;
  }
  async writeDescriptor(deviceId, service, characteristic, descriptor, value, options) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    descriptor = parseUUID(descriptor);
    return this.queue(async () => {
      if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
        throw new Error("Invalid data.");
      }
      let writeValue = value;
      if (Capacitor.getPlatform() !== "web") {
        writeValue = dataViewToHexString(value);
      }
      await BluetoothLe.writeDescriptor(Object.assign({
        deviceId,
        service,
        characteristic,
        descriptor,
        value: writeValue
      }, options));
    });
  }
  async startNotifications(deviceId, service, characteristic, callback, options) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    await this.queue(async () => {
      var _a;
      const key = `notification|${deviceId}|${service}|${characteristic}`;
      await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
      const listener = await BluetoothLe.addListener(key, (event) => {
        callback(this.convertValue(event === null || event === void 0 ? void 0 : event.value));
      });
      this.eventListeners.set(key, listener);
      await BluetoothLe.startNotifications(Object.assign({
        deviceId,
        service,
        characteristic
      }, options));
    });
  }
  async stopNotifications(deviceId, service, characteristic) {
    service = parseUUID(service);
    characteristic = parseUUID(characteristic);
    await this.queue(async () => {
      var _a;
      const key = `notification|${deviceId}|${service}|${characteristic}`;
      await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
      this.eventListeners.delete(key);
      await BluetoothLe.stopNotifications({
        deviceId,
        service,
        characteristic
      });
    });
  }
  validateRequestBleDeviceOptions(options) {
    options = Object.assign({}, options);
    if (options.services) {
      options.services = options.services.map(parseUUID);
    }
    if (options.optionalServices) {
      options.optionalServices = options.optionalServices.map(parseUUID);
    }
    if (options.serviceData && Capacitor.getPlatform() !== "web") {
      options.serviceData = options.serviceData.map((filter) => Object.assign(Object.assign({}, filter), { serviceUuid: parseUUID(filter.serviceUuid), dataPrefix: toHexString(filter.dataPrefix), mask: toHexString(filter.mask) }));
    }
    if (options.manufacturerData) {
      if (Capacitor.getPlatform() !== "web") {
        options.manufacturerData = options.manufacturerData.map((filter) => Object.assign(Object.assign({}, filter), { dataPrefix: toHexString(filter.dataPrefix), mask: toHexString(filter.mask) }));
      } else {
        options.manufacturerData = options.manufacturerData.map((filter) => Object.assign(Object.assign({}, filter), { dataPrefix: toUint8Array(filter.dataPrefix), mask: toUint8Array(filter.mask) }));
      }
    }
    return options;
  }
  convertValue(value) {
    if (typeof value === "string") {
      return hexStringToDataView(value);
    } else if (value === void 0) {
      return new DataView(new ArrayBuffer(0));
    }
    return value;
  }
  convertObject(obj) {
    if (obj === void 0) {
      return void 0;
    }
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = this.convertValue(obj[key]);
    }
    return result;
  }
}
new BleClientClass();
const css$1 = {
  code: ".bluetooth-printer.svelte-1o7miz8{margin-top:1rem;padding:1rem;border:1px solid var(--border);border-radius:0.5rem}.status.svelte-1o7miz8{margin-top:0.5rem;font-size:0.9rem;color:var(--text-light)}",
  map: `{"version":3,"file":"BluetoothPrinter.svelte","sources":["BluetoothPrinter.svelte"],"sourcesContent":["<script>\\n    import { hasPrinterPermission } from '$lib/permissions';\\n    import { Capacitor } from '@capacitor/core';\\n    import { BleClient } from '@capacitor-community/bluetooth-le';\\n\\n    let device;\\n    let deviceId; // For Capacitor\\n    let serviceUUID; // For Capacitor\\n    let characteristicUUID; // For Capacitor\\n    let isConnecting = false;\\n    let statusMessage = '';\\n\\n    async function connect() {\\n        if (Capacitor.isNativePlatform()) {\\n            await connectNative();\\n        } else {\\n            await connectWeb();\\n        }\\n    }\\n\\n    async function connectWeb() {\\n        if (!navigator.bluetooth) {\\n            statusMessage = 'Web Bluetooth API is not available in this browser.';\\n            return;\\n        }\\n        try {\\n            isConnecting = true;\\n            statusMessage = 'Requesting Bluetooth device...';\\n            device = await navigator.bluetooth.requestDevice({\\n                acceptAllDevices: true,\\n            });\\n            statusMessage = \`Connecting to \${device.name}...\`;\\n            const server = await device.gatt.connect();\\n            statusMessage = 'Getting service...';\\n            const services = await server.getPrimaryServices();\\n            if (services.length > 0) {\\n                serviceUUID = services[0].uuid;\\n                const service = services[0];\\n                statusMessage = 'Getting characteristic...';\\n                const characteristics = await service.getCharacteristics();\\n                if (characteristics.length > 0) {\\n                    characteristicUUID = characteristics[0].uuid;\\n                    statusMessage = \`Connected to \${device.name}. Ready to print.\`;\\n                } else {\\n                    statusMessage = 'No characteristics found.';\\n                }\\n            } else {\\n                statusMessage = 'No services found.';\\n            }\\n        } catch (error) {\\n            statusMessage = \`Error: \${error.message}\`;\\n        } finally {\\n            isConnecting = false;\\n        }\\n    }\\n\\n    async function connectNative() {\\n        try {\\n            isConnecting = true;\\n            await BleClient.initialize();\\n            \\n            // Android requires location services to be enabled\\n            if (Capacitor.getPlatform() === 'android') {\\n                 const locationEnabled = await BleClient.isLocationEnabled();\\n                 if (!locationEnabled) {\\n                     statusMessage = 'Please enable location services.';\\n                     isConnecting = false;\\n                     return;\\n                 }\\n            }\\n\\n            statusMessage = 'Scanning for devices...';\\n            // For simplicity, we connect to the first found device.\\n            // A real app should show a list of devices.\\n            const result = await BleClient.requestLEScan({}, (result) => {\\n                 // for now, we will just grab the first device\\n            });\\n            \\n            if (result.device) {\\n                device = result.device;\\n                deviceId = device.deviceId;\\n                statusMessage = \`Connecting to \${device.name || device.deviceId}...\`;\\n                await BleClient.connect(deviceId);\\n                statusMessage = 'Discovering services...';\\n                const services = await BleClient.getServices(deviceId);\\n                if (services.length > 0) {\\n                    serviceUUID = services[0].uuid;\\n                    if (services[0].characteristics.length > 0) {\\n                        characteristicUUID = services[0].characteristics[0].uuid;\\n                        statusMessage = \`Connected to \${device.name}. Ready to print.\`;\\n                    } else {\\n                        statusMessage = 'No characteristics found.';\\n                    }\\n                } else {\\n                    statusMessage = 'No services found.';\\n                }\\n            } else {\\n                statusMessage = 'No device found.';\\n            }\\n        } catch (error) {\\n            statusMessage = \`Error: \${error.message}\`;\\n        } finally {\\n            isConnecting = false;\\n        }\\n    }\\n\\n    async function print(text) {\\n        if (!serviceUUID || !characteristicUUID) {\\n            statusMessage = 'Not connected to a printer.';\\n            return;\\n        }\\n\\n        try {\\n            const encoder = new TextEncoder();\\n            const data = encoder.encode(text + '\\\\n\\\\n\\\\n');\\n            if (Capacitor.isNativePlatform()) {\\n                await BleClient.write(deviceId, serviceUUID, characteristicUUID, data.buffer);\\n            } else {\\n                const server = await device.gatt.connect();\\n                const service = await server.getPrimaryService(serviceUUID);\\n                const characteristic = await service.getCharacteristic(characteristicUUID);\\n                await characteristic.writeValue(data);\\n            }\\n            statusMessage = 'Print command sent.';\\n        } catch (error) {\\n            statusMessage = \`Print error: \${error.message}\`;\\n        }\\n    }\\n\\n    // Expose the print function to be called from the parent\\n    export { print };\\n<\/script>\\n\\n<div class=\\"bluetooth-printer\\">\\n    {#if !$hasPrinterPermission}\\n        <p class=\\"status\\">Please grant permission to use the printer.</p>\\n    {/if}\\n    {#if !device}\\n        <button on:click={connect} disabled={isConnecting || !$hasPrinterPermission}>\\n            {isConnecting ? 'Connecting...' : 'Connect to Printer'}\\n        </button>\\n    {:else}\\n        <p>Connected to: {device.name}</p>\\n    {/if}\\n    {#if statusMessage}\\n        <p class=\\"status\\">{statusMessage}</p>\\n    {/if}\\n</div>\\n\\n<style>\\n    .bluetooth-printer {\\n        margin-top: 1rem;\\n        padding: 1rem;\\n        border: 1px solid var(--border);\\n        border-radius: 0.5rem;\\n    }\\n    .status {\\n        margin-top: 0.5rem;\\n        font-size: 0.9rem;\\n        color: var(--text-light);\\n    }\\n</style>\\n"],"names":[],"mappings":"AAsJI,iCAAmB,CACf,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,QAAQ,CAAC,CAC/B,aAAa,CAAE,MACnB,CACA,sBAAQ,CACJ,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,YAAY,CAC3B"}`
};
const BluetoothPrinter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPrinterPermission, $$unsubscribe_hasPrinterPermission;
  $$unsubscribe_hasPrinterPermission = subscribe(hasPrinterPermission, (value) => $hasPrinterPermission = value);
  let statusMessage = "";
  async function print(text) {
    {
      statusMessage = "Not connected to a printer.";
      return;
    }
  }
  if ($$props.print === void 0 && $$bindings.print && print !== void 0) $$bindings.print(print);
  $$result.css.add(css$1);
  $$unsubscribe_hasPrinterPermission();
  return `<div class="bluetooth-printer svelte-1o7miz8">${!$hasPrinterPermission ? `<p class="status svelte-1o7miz8" data-svelte-h="svelte-1qoom6t">Please grant permission to use the printer.</p>` : ``} ${`<button ${!$hasPrinterPermission ? "disabled" : ""}>${escape("Connect to Printer")}</button>`} ${statusMessage ? `<p class="status svelte-1o7miz8">${escape(statusMessage)}</p>` : ``} </div>`;
});
const css = {
  code: ".container.svelte-1n0r4ab.svelte-1n0r4ab{max-width:800px;margin:0 auto;padding:2rem;min-height:100vh;display:flex;align-items:center;justify-content:center}.token-card.svelte-1n0r4ab.svelte-1n0r4ab{background:white;padding:1.25rem;border-radius:1.5rem;box-shadow:var(--shadow-lg);width:100%}.print-header.svelte-1n0r4ab.svelte-1n0r4ab{text-align:center;margin-bottom:1rem;padding-bottom:1rem;border-bottom:2px dashed var(--border)}.hospital-logo.svelte-1n0r4ab.svelte-1n0r4ab{font-size:2.4rem;margin-bottom:0.25rem}.print-header.svelte-1n0r4ab h1.svelte-1n0r4ab{color:var(--primary);font-size:1.6rem;margin-bottom:0.5rem}.subtitle.svelte-1n0r4ab.svelte-1n0r4ab{color:var(--text-light);font-size:1rem}.token-number-section.svelte-1n0r4ab.svelte-1n0r4ab{text-align:center;margin:0.75rem 0;padding:0.5rem 0.75rem;background:#ffffff;border-radius:0.5rem;border:1px solid #000}.label.svelte-1n0r4ab.svelte-1n0r4ab{color:#000;font-size:0.7rem;margin-bottom:0.15rem;font-weight:600;line-height:0.95}.token-number.svelte-1n0r4ab.svelte-1n0r4ab{color:#000;font-size:2.4rem;font-weight:900;line-height:0.95;text-shadow:none}.section-info.svelte-1n0r4ab.svelte-1n0r4ab{margin:0.25rem 0;padding:0.5rem;background:transparent;border-radius:0.5rem}.info-row.svelte-1n0r4ab.svelte-1n0r4ab{display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border)}.info-row.svelte-1n0r4ab.svelte-1n0r4ab:last-child{border-bottom:none}.info-label.svelte-1n0r4ab.svelte-1n0r4ab{color:var(--text-light);font-weight:600}.info-value.svelte-1n0r4ab.svelte-1n0r4ab{color:var(--text-dark);font-weight:600}.datetime-section.svelte-1n0r4ab.svelte-1n0r4ab{text-align:center;margin:0.5rem 0;padding:0.5rem;background:var(--bg-light);border-radius:0.5rem}.date.svelte-1n0r4ab.svelte-1n0r4ab{color:#000;font-size:0.7rem;font-weight:600;margin-bottom:0;line-height:1.2}.time.svelte-1n0r4ab.svelte-1n0r4ab{color:#000;font-size:0.65rem;margin-top:0;line-height:1.2}.queue-position.svelte-1n0r4ab.svelte-1n0r4ab{text-align:center;margin:0.5rem 0;padding:0.5rem;border:1px solid var(--primary);border-radius:0.5rem}.queue-label.svelte-1n0r4ab.svelte-1n0r4ab{color:#000;font-size:0.65rem;margin-bottom:0.1rem;line-height:0.9}.queue-number.svelte-1n0r4ab.svelte-1n0r4ab{color:#000;font-size:1.1rem;font-weight:700;line-height:0.95}.actions.svelte-1n0r4ab.svelte-1n0r4ab{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2rem 0}.print-btn.svelte-1n0r4ab.svelte-1n0r4ab,.home-btn.svelte-1n0r4ab.svelte-1n0r4ab{padding:1rem;border-radius:0.75rem;font-size:1.1rem;font-weight:700;transition:all 0.2s}.print-btn.svelte-1n0r4ab.svelte-1n0r4ab{background:var(--primary);color:white}.print-btn.svelte-1n0r4ab.svelte-1n0r4ab:hover{background:var(--primary-dark);transform:translateY(-2px);box-shadow:var(--shadow)}.home-btn.svelte-1n0r4ab.svelte-1n0r4ab{background:white;color:var(--primary);border:2px solid var(--primary)}.home-btn.svelte-1n0r4ab.svelte-1n0r4ab:hover{background:var(--bg-light)}.token-footer.svelte-1n0r4ab.svelte-1n0r4ab{text-align:center;margin-top:0.5rem;padding-top:0.5rem;border-top:1px dashed var(--border)}.token-footer.svelte-1n0r4ab p.svelte-1n0r4ab{color:#000;margin-bottom:0.15rem;font-size:0.5rem;line-height:1.2}.footer-main.svelte-1n0r4ab.svelte-1n0r4ab{font-size:0.5rem;font-weight:700;line-height:0.95;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media print{@page{size:80mm auto;margin:4mm}.container.svelte-1n0r4ab.svelte-1n0r4ab{padding:0;width:280px;margin:0}.token-card.svelte-1n0r4ab.svelte-1n0r4ab{box-shadow:none;border-radius:0;padding:8px;width:100%;background:white;color:#000}.print-header.svelte-1n0r4ab h1.svelte-1n0r4ab{font-size:15px;margin:2px 0}.subtitle.svelte-1n0r4ab.svelte-1n0r4ab{font-size:11px;margin-bottom:4px}.hospital-logo.svelte-1n0r4ab.svelte-1n0r4ab{font-size:20px}.token-number-section.svelte-1n0r4ab.svelte-1n0r4ab{padding:6px;margin:6px 0}.label.svelte-1n0r4ab.svelte-1n0r4ab{font-size:10px;color:#000}.token-number.svelte-1n0r4ab.svelte-1n0r4ab{font-size:32px;font-weight:800;color:#000;padding:2px 0}.section-info.svelte-1n0r4ab.svelte-1n0r4ab,.datetime-section.svelte-1n0r4ab.svelte-1n0r4ab,.queue-position.svelte-1n0r4ab.svelte-1n0r4ab,.token-footer.svelte-1n0r4ab.svelte-1n0r4ab{padding:6px 2px;margin:4px 0;background:transparent;border:none}.info-row.svelte-1n0r4ab.svelte-1n0r4ab{padding:4px 0;border-bottom:none;font-size:11px}.token-footer.svelte-1n0r4ab.svelte-1n0r4ab{font-size:10px;margin-top:8px}.no-print.svelte-1n0r4ab.svelte-1n0r4ab{display:none !important}.svelte-1n0r4ab.svelte-1n0r4ab{box-sizing:border-box}}@media(max-width: 768px){.container.svelte-1n0r4ab.svelte-1n0r4ab{padding:1rem}.token-card.svelte-1n0r4ab.svelte-1n0r4ab{padding:2rem}.token-number.svelte-1n0r4ab.svelte-1n0r4ab{font-size:4rem}.actions.svelte-1n0r4ab.svelte-1n0r4ab{grid-template-columns:1fr}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport { page } from '$app/stores';\\n\\timport { sections } from '$lib/stores';\\n\\timport { goto } from '$app/navigation';\\n\\timport { onMount } from 'svelte';\\n\\timport { _ } from 'svelte-i18n';\\n\\timport BluetoothPrinter from '$lib/components/BluetoothPrinter.svelte';\\n\\t\\n\\t$: tokenNumber = parseInt($page.params.number);\\n\\t$: sectionId = parseInt($page.url.searchParams.get('section') || '0');\\n\\t$: section = $sections.find(s => s.id === sectionId);\\n\\t$: token = section?.queue.find(t => t.number === tokenNumber);\\n\\t\\n\\tlet currentDate = '';\\n\\tlet currentTime = '';\\n\\tlet bluetoothPrinter;\\n\\n\\tonMount(() => {\\n\\t\\tupdateDateTime();\\n\\t\\tconst interval = setInterval(updateDateTime, 1000);\\n\\t\\treturn () => clearInterval(interval);\\n\\t});\\n\\n\\tfunction updateDateTime() {\\n\\t\\tconst now = new Date();\\n\\t\\tcurrentDate = now.toLocaleDateString(undefined, { \\n\\t\\t\\tweekday: 'long', \\n\\t\\t\\tyear: 'numeric', \\n\\t\\t\\tmonth: 'long', \\n\\t\\t\\tday: 'numeric' \\n\\t\\t});\\n\\t\\tcurrentTime = now.toLocaleTimeString(undefined);\\n\\t}\\n\\n\\tasync function printToken() {\\n\\t\\t// Only run printing in browser\\n\\t\\tif (typeof window === 'undefined') return;\\n\\n\\t\\tif (bluetoothPrinter && bluetoothPrinter.print) {\\n\\t\\t\\tconst textToPrint = \`\\n\${$_('hospital.title')}\\n\${$_('tokenPage.subtitle')}\\n\\n\${$_('tokenPage.yourTokenNumber')}: \${tokenNumber}\\n\\n\${$_('tokenPage.section')}: \${section.name}\\n\${$_('tokenPage.type')}: \${section.type === 'clinic' ? $_('tokenPage.clinic') : $_('tokenPage.laboratory')}\\n\${$_('tokenPage.feePaid')}: \${section.price} \${$_('currency')}\\n\\n\${currentDate}\\n\${currentTime}\\n\\n\${$_('queue.positionInQueue')}: \${section.queue.findIndex(t => t.number === tokenNumber) + 1} / \${section.queue.length}\\n\\n\${$_('tokenPage.thankYouMessage')}\\n\\t\\t\\t\`;\\n\\t\\t\\tawait bluetoothPrinter.print(textToPrint);\\n\\t\\t} else {\\n\\t\\t\\t// Fallback to window.print if bluetooth is not available\\n\\t\\t\\twindow.print && window.print();\\n\\t\\t}\\n\\t}\\n\\n\\tfunction goHome() {\\n\\t\\tgoto('/');\\n\\t}\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>{$_('tokenPage.yourTokenNumber')} #{tokenNumber} - {$_('hospital.title')}</title>\\n</svelte:head>\\n\\n<div class=\\"container\\">\\n\\t<div class=\\"token-card\\">\\n\\t\\t<!-- Print Header -->\\n\\t\\t<div class=\\"print-header\\">\\n\\t\\t\\t<div class=\\"hospital-logo\\">🏥</div>\\n\\t\\t\\t<h1>{$_('hospital.title')}</h1>\\n\\t\\t\\t<p class=\\"subtitle\\">{$_('tokenPage.subtitle')}</p>\\n\\t\\t</div>\\n\\n\\t\\t<!-- Token Number -->\\n\\t\\t<div class=\\"token-number-section\\">\\n\\t\\t\\t<p class=\\"label\\">{$_('tokenPage.yourTokenNumber')}</p>\\n\\t\\t\\t<div class=\\"token-number\\">{tokenNumber}</div>\\n\\t\\t</div>\\n\\n\\t\\t<!-- Section Info -->\\n\\t\\t{#if section}\\n\\t\\t\\t<div class=\\"section-info\\">\\n\\t\\t\\t\\t<div class=\\"info-row\\">\\n\\t\\t\\t\\t\\t<span class=\\"info-label\\">{$_('tokenPage.section')}</span>\\n\\t\\t\\t\\t\\t<span class=\\"info-value\\">{section.name}</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"info-row\\">\\n\\t\\t\\t\\t\\t<span class=\\"info-label\\">{$_('tokenPage.type')}</span>\\n\\t\\t\\t\\t\\t<span class=\\"info-value\\">{section.type === 'clinic' ? $_('tokenPage.clinic') : $_('tokenPage.laboratory')}</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"info-row\\">\\n\\t\\t\\t\\t\\t<span class=\\"info-label\\">{$_('tokenPage.feePaid')}</span>\\n\\t\\t\\t\\t\\t<span class=\\"info-value\\">{section.price} {$_('currency')}</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\n\\t\\t<!-- Date & Time -->\\n\\t\\t<div class=\\"datetime-section\\">\\n\\t\\t\\t<p class=\\"date\\">{currentDate}</p>\\n\\t\\t\\t<p class=\\"time\\">{currentTime}</p>\\n\\t\\t</div>\\n\\n\\t\\t<!-- Queue Position -->\\n\\t\\t{#if section}\\n\\t\\t\\t<div class=\\"queue-position\\">\\n\\t\\t\\t\\t<p class=\\"queue-label\\">{$_('queue.positionInQueue')}</p>\\n\\t\\t\\t\\t<p class=\\"queue-number\\">\\n\\t\\t\\t\\t\\t{section.queue.findIndex(t => t.number === tokenNumber) + 1} / {section.queue.length}\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\n\\t\\t<!-- Instructions -->\\n\\t\\t<!-- Instructions removed per request -->\\n\\n\\t\\t<!-- Action Buttons -->\\n\\t\\t<div class=\\"actions no-print\\">\\n\\t\\t\\t<button class=\\"print-btn\\" on:click={printToken}>\\n\\t\\t\\t\\t🖨️ {$_('tokenPage.printToken')}\\n\\t\\t\\t</button>\\n\\t\\t\\t<button class=\\"home-btn\\" on:click={goHome}>\\n\\t\\t\\t\\t🏠 {$_('tokenPage.backToHome')}\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"no-print\\">\\n\\t\\t\\t<BluetoothPrinter bind:this={bluetoothPrinter} />\\n\\t\\t</div>\\n\\n\\t\\t<!-- Footer -->\\n\\t\\t<div class=\\"token-footer\\">\\n\\t\\t\\t<p class=\\"footer-main\\">{$_('tokenPage.thankYouMessage')} <br> {$_('hospital.title')}</p>\\n\\t\\t\\t<!-- <p class=\\"footer-urgent\\">For emergencies, please contact …</p> -->\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.container {\\n\\t\\tmax-width: 800px;\\n\\t\\tmargin: 0 auto;\\n\\t\\tpadding: 2rem;\\n\\t\\tmin-height: 100vh;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\n\\t.token-card {\\n\\t\\tbackground: white;\\n\\t\\tpadding: 1.25rem;\\n\\t\\tborder-radius: 1.5rem;\\n\\t\\tbox-shadow: var(--shadow-lg);\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.print-header {\\n\\t\\ttext-align: center;\\n\\t\\tmargin-bottom: 1rem;\\n\\t\\tpadding-bottom: 1rem;\\n\\t\\tborder-bottom: 2px dashed var(--border);\\n\\t}\\n\\n\\t\\t.hospital-logo {\\n\\t\\t\\tfont-size: 2.4rem;\\n\\t\\t\\tmargin-bottom: 0.25rem;\\n\\t\\t}\\n\\n\\t.print-header h1 {\\n\\t\\tcolor: var(--primary);\\n\\t\\tfont-size: 1.6rem;\\n\\t\\tmargin-bottom: 0.5rem;\\n\\t}\\n\\n\\t.subtitle {\\n\\t\\tcolor: var(--text-light);\\n\\t\\tfont-size: 1rem;\\n\\t}\\n\\n\\t\\t.token-number-section {\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tmargin: 0.75rem 0;\\n\\t\\t\\tpadding: 0.5rem 0.75rem;\\n\\t\\t\\tbackground: #ffffff; /* B/W */\\n\\t\\t\\tborder-radius: 0.5rem;\\n\\t\\t\\tborder: 1px solid #000;\\n\\t\\t}\\n\\n\\t\\t.label {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tfont-size: 0.7rem;\\n\\t\\t\\tmargin-bottom: 0.15rem;\\n\\t\\t\\tfont-weight: 600;\\n\\t\\t\\tline-height: 0.95;\\n\\t\\t}\\n\\n\\t\\t.token-number {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tfont-size: 2.4rem;\\n\\t\\t\\tfont-weight: 900;\\n\\t\\t\\tline-height: 0.95;\\n\\t\\t\\ttext-shadow: none;\\n\\t\\t}\\n\\n\\t\\t.section-info {\\n\\t\\t\\tmargin: 0.25rem 0;\\n\\t\\t\\tpadding: 0.5rem;\\n\\t\\t\\tbackground: transparent;\\n\\t\\t\\tborder-radius: 0.5rem;\\n\\t\\t}\\n\\n\\t.info-row {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tpadding: 0.75rem 0;\\n\\t\\tborder-bottom: 1px solid var(--border);\\n\\t}\\n\\n\\t.info-row:last-child {\\n\\t\\tborder-bottom: none;\\n\\t}\\n\\n\\t.info-label {\\n\\t\\tcolor: var(--text-light);\\n\\t\\tfont-weight: 600;\\n\\t}\\n\\n\\t.info-value {\\n\\t\\tcolor: var(--text-dark);\\n\\t\\tfont-weight: 600;\\n\\t}\\n\\n\\t\\t.datetime-section {\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tmargin: 0.5rem 0;\\n\\t\\t\\tpadding: 0.5rem;\\n\\t\\t\\tbackground: var(--bg-light);\\n\\t\\t\\tborder-radius: 0.5rem;\\n\\t\\t}\\n\\n\\t\\t.date {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tfont-size: 0.7rem;\\n\\t\\t\\tfont-weight: 600;\\n\\t\\t\\tmargin-bottom: 0;\\n\\t\\t\\tline-height: 1.2;\\n\\t\\t}\\n\\n\\t\\t.time {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tfont-size: 0.65rem;\\n\\t\\t\\tmargin-top: 0;\\n\\t\\t\\tline-height: 1.2;\\n\\t\\t}\\n\\n\\t\\t.queue-position {\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tmargin: 0.5rem 0;\\n\\t\\t\\tpadding: 0.5rem;\\n\\t\\t\\tborder: 1px solid var(--primary);\\n\\t\\t\\tborder-radius: 0.5rem;\\n\\t\\t}\\n\\n\\t\\t.queue-label {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tfont-size: 0.65rem;\\n\\t\\t\\tmargin-bottom: 0.1rem;\\n\\t\\t\\tline-height: 0.9;\\n\\t\\t}\\n\\n\\t\\t.queue-number {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tfont-size: 1.1rem;\\n\\t\\t\\tfont-weight: 700;\\n\\t\\t\\tline-height: 0.95;\\n\\t\\t}\\n\\n\\t/* .instructions {\\n\\t\\tmargin: 2rem 0;\\n\\t\\tpadding: 1.5rem;\\n\\t\\tbackground: #fef3c7;\\n\\t\\tborder-left: 4px solid var(--warning);\\n\\t\\tborder-radius: 0.5rem;\\n\\t}\\n\\n\\t.instructions h3 {\\n\\t\\tcolor: var(--text-dark);\\n\\t\\tfont-size: 1.1rem;\\n\\t\\tmargin-bottom: 1rem;\\n\\t}\\n\\n\\t.instructions ul {\\n\\t\\tlist-style-position: inside;\\n\\t\\tcolor: var(--text-dark);\\n\\t}\\n\\n\\t.instructions li {\\n\\t\\tmargin-bottom: 0.5rem;\\n\\t\\tline-height: 1.5;\\n\\t} */\\n\\n\\t.actions {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 1fr 1fr;\\n\\t\\tgap: 1rem;\\n\\t\\tmargin: 2rem 0;\\n\\t}\\n\\n\\t.print-btn, .home-btn {\\n\\t\\tpadding: 1rem;\\n\\t\\tborder-radius: 0.75rem;\\n\\t\\tfont-size: 1.1rem;\\n\\t\\tfont-weight: 700;\\n\\t\\ttransition: all 0.2s;\\n\\t}\\n\\n\\t.print-btn {\\n\\t\\tbackground: var(--primary);\\n\\t\\tcolor: white;\\n\\t}\\n\\n\\t.print-btn:hover {\\n\\t\\tbackground: var(--primary-dark);\\n\\t\\ttransform: translateY(-2px);\\n\\t\\tbox-shadow: var(--shadow);\\n\\t}\\n\\n\\t.home-btn {\\n\\t\\tbackground: white;\\n\\t\\tcolor: var(--primary);\\n\\t\\tborder: 2px solid var(--primary);\\n\\t}\\n\\n\\t.home-btn:hover {\\n\\t\\tbackground: var(--bg-light);\\n\\t}\\n\\n\\t\\t.token-footer {\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tmargin-top: 0.5rem;\\n\\t\\t\\tpadding-top: 0.5rem;\\n\\t\\t\\tborder-top: 1px dashed var(--border);\\n\\t\\t}\\n\\n\\t\\t.token-footer p {\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tmargin-bottom: 0.15rem;\\n\\t\\t\\tfont-size: 0.5rem;\\n\\t\\t\\tline-height: 1.2;\\n\\t\\t}\\n\\n\\t\\t.footer-main {\\n\\t\\t\\tfont-size: 0.5rem;\\n\\t\\t\\tfont-weight: 700;\\n\\t\\t\\tline-height: 0.95;\\n\\t\\t\\twhite-space: nowrap;\\n\\t\\t\\toverflow: hidden;\\n\\t\\t\\ttext-overflow: ellipsis;\\n\\t\\t}\\n\\n\\t\\t/* .footer-urgent {\\n\\t\\t\\tfont-size: 0.65rem;\\n\\t\\t\\tline-height: 0.95;\\n\\t\\t\\twhite-space: nowrap;\\n\\t\\t\\toverflow: hidden;\\n\\t\\t\\ttext-overflow: ellipsis;\\n\\t\\t}\\n\\n\\t\\t.small {\\n\\t\\t\\tfont-size: 0.7rem;\\n\\t\\t} */\\n\\n\\t@media print {\\n\\t\\t/* Target thermal 80mm receipts: compact layout */\\n\\t\\t@page { size: 80mm auto; margin: 4mm; }\\n\\n\\t\\t/* html, body {\\n\\t\\t\\tbackground: white;\\n\\t\\t} */\\n\\n\\t\\t.container {\\n\\t\\t\\tpadding: 0;\\n\\t\\t\\twidth: 280px; /* approx 80mm at common DPI */\\n\\t\\t\\tmargin: 0;\\n\\t\\t}\\n\\n\\t\\t.token-card {\\n\\t\\t\\tbox-shadow: none;\\n\\t\\t\\tborder-radius: 0;\\n\\t\\t\\tpadding: 8px;\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\tbackground: white;\\n\\t\\t\\tcolor: #000;\\n\\t\\t}\\n\\n\\t\\t.print-header h1 {\\n\\t\\t\\tfont-size: 15px;\\n\\t\\t\\tmargin: 2px 0;\\n\\t\\t}\\n\\n\\t\\t.subtitle { font-size: 11px; margin-bottom: 4px; }\\n\\n\\t\\t.hospital-logo { font-size: 20px; }\\n\\n\\t\\t.token-number-section { padding: 6px; margin: 6px 0; }\\n\\n\\t\\t.label { font-size: 10px; color: #000; }\\n\\n\\t\\t.token-number {\\n\\t\\t\\tfont-size: 32px;\\n\\t\\t\\tfont-weight: 800;\\n\\t\\t\\tcolor: #000;\\n\\t\\t\\tpadding: 2px 0;\\n\\t\\t}\\n\\t\\t/* add .instructions here later when you decide on content */\\n\\t\\t.section-info, .datetime-section, .queue-position, .token-footer {\\n\\t\\t\\tpadding: 6px 2px;\\n\\t\\t\\tmargin: 4px 0;\\n\\t\\t\\tbackground: transparent;\\n\\t\\t\\tborder: none;\\n\\t\\t}\\n\\n\\t\\t.info-row { padding: 4px 0; border-bottom: none; font-size: 11px; }\\n\\n\\t\\t/* .instructions { font-size: 10px; } */\\n\\n\\t\\t.token-footer { font-size: 10px; margin-top: 8px; }\\n\\n\\t\\t/* Hide interactive elements when printing */\\n\\t\\t.no-print { display: none !important; }\\n\\n\\t\\t/* Ensure compact spacing */\\n\\t\\t* { box-sizing: border-box; }\\n\\t}\\n\\n\\t@media (max-width: 768px) {\\n\\t\\t.container {\\n\\t\\t\\tpadding: 1rem;\\n\\t\\t}\\n\\n\\t\\t.token-card {\\n\\t\\t\\tpadding: 2rem;\\n\\t\\t}\\n\\n\\t\\t.token-number {\\n\\t\\t\\tfont-size: 4rem;\\n\\t\\t}\\n\\n\\t\\t.actions {\\n\\t\\t\\tgrid-template-columns: 1fr;\\n\\t\\t}\\n\\t}\\n</style>"],"names":[],"mappings":"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"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tokenNumber;
  let sectionId;
  let section;
  let $_, $$unsubscribe__;
  let $sections, $$unsubscribe_sections;
  let $page, $$unsubscribe_page;
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  $$unsubscribe_sections = subscribe(sections, (value) => $sections = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let currentDate = "";
  let currentTime = "";
  let bluetoothPrinter;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    tokenNumber = parseInt($page.params.number);
    sectionId = parseInt($page.url.searchParams.get("section") || "0");
    section = $sections.find((s) => s.id === sectionId);
    section?.queue.find((t) => t.number === tokenNumber);
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1swwec3_START -->${$$result.title = `<title>${escape($_("tokenPage.yourTokenNumber"))} #${escape(tokenNumber)} - ${escape($_("hospital.title"))}</title>`, ""}<!-- HEAD_svelte-1swwec3_END -->`, ""} <div class="container svelte-1n0r4ab"><div class="token-card svelte-1n0r4ab"> <div class="print-header svelte-1n0r4ab"><div class="hospital-logo svelte-1n0r4ab" data-svelte-h="svelte-17r3utu">🏥</div> <h1 class="svelte-1n0r4ab">${escape($_("hospital.title"))}</h1> <p class="subtitle svelte-1n0r4ab">${escape($_("tokenPage.subtitle"))}</p></div>  <div class="token-number-section svelte-1n0r4ab"><p class="label svelte-1n0r4ab">${escape($_("tokenPage.yourTokenNumber"))}</p> <div class="token-number svelte-1n0r4ab">${escape(tokenNumber)}</div></div>  ${section ? `<div class="section-info svelte-1n0r4ab"><div class="info-row svelte-1n0r4ab"><span class="info-label svelte-1n0r4ab">${escape($_("tokenPage.section"))}</span> <span class="info-value svelte-1n0r4ab">${escape(section.name)}</span></div> <div class="info-row svelte-1n0r4ab"><span class="info-label svelte-1n0r4ab">${escape($_("tokenPage.type"))}</span> <span class="info-value svelte-1n0r4ab">${escape(section.type === "clinic" ? $_("tokenPage.clinic") : $_("tokenPage.laboratory"))}</span></div> <div class="info-row svelte-1n0r4ab"><span class="info-label svelte-1n0r4ab">${escape($_("tokenPage.feePaid"))}</span> <span class="info-value svelte-1n0r4ab">${escape(section.price)} ${escape($_("currency"))}</span></div></div>` : ``}  <div class="datetime-section svelte-1n0r4ab"><p class="date svelte-1n0r4ab">${escape(currentDate)}</p> <p class="time svelte-1n0r4ab">${escape(currentTime)}</p></div>  ${section ? `<div class="queue-position svelte-1n0r4ab"><p class="queue-label svelte-1n0r4ab">${escape($_("queue.positionInQueue"))}</p> <p class="queue-number svelte-1n0r4ab">${escape(section.queue.findIndex((t) => t.number === tokenNumber) + 1)} / ${escape(section.queue.length)}</p></div>` : ``}    <div class="actions no-print svelte-1n0r4ab"><button class="print-btn svelte-1n0r4ab">🖨️ ${escape($_("tokenPage.printToken"))}</button> <button class="home-btn svelte-1n0r4ab">🏠 ${escape($_("tokenPage.backToHome"))}</button></div> <div class="no-print svelte-1n0r4ab">${validate_component(BluetoothPrinter, "BluetoothPrinter").$$render(
      $$result,
      { this: bluetoothPrinter },
      {
        this: ($$value) => {
          bluetoothPrinter = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="token-footer svelte-1n0r4ab"><p class="footer-main svelte-1n0r4ab">${escape($_("tokenPage.thankYouMessage"))} <br class="svelte-1n0r4ab"> ${escape($_("hospital.title"))}</p> </div></div> </div>`;
  } while (!$$settled);
  $$unsubscribe__();
  $$unsubscribe_sections();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as P,
  hexStringToDataView as h,
  mapToObject as m,
  toArrayBufferDataView as t,
  webUUIDToString as w
};
