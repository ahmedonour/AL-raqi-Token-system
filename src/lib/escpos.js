// Minimal ESC/POS encoder for basic receipt printing
// Produces Uint8Array containing ESC/POS commands

export class EscPosEncoder {
  constructor() {
    this._buffer = [];
  }

  static _concatBuffers(buffers) {
    const total = buffers.reduce((s, b) => s + b.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const b of buffers) {
      out.set(b, offset);
      offset += b.length;
    }
    return out;
  }

  _enqueue(command) {
    this._buffer.push(command);
  }

  encode() {
    const result = EscPosEncoder._concatBuffers(this._buffer);
    this._buffer = []; // Clear buffer after encoding
    return result;
  }

  text(t = '') {
    this._enqueue(new TextEncoder().encode(t));
    return this;
  }

  newline(n = 1) {
    this._enqueue(new Uint8Array(new Array(n).fill(0x0a)));
    return this;
  }

  alignLeft() {
    this._enqueue(new Uint8Array([0x1b, 0x61, 0x00]));
    return this;
  }

  alignCenter() {
    this._enqueue(new Uint8Array([0x1b, 0x61, 0x01]));
    return this;
  }

  alignRight() {
    this._enqueue(new Uint8Array([0x1b, 0x61, 0x02]));
    return this;
  }

  boldOn() {
    this._enqueue(new Uint8Array([0x1b, 0x45, 0x01]));
    return this;
  }

  boldOff() {
    this._enqueue(new Uint8Array([0x1b, 0x45, 0x00]));
    return this;
  }

  // Size: n = 0..7 where (width, height) bits combined. 0 = normal, 0x11 = double width+height
  size(n = 0) {
    this._enqueue(new Uint8Array([0x1d, 0x21, n]));
    return this;
  }

  cut() {
    this._enqueue(new Uint8Array([0x1d, 0x56, 0x00]));
    return this;
  }

  feed(n = 1) {
    this._enqueue(new Uint8Array([0x1b, 0x64, n]));
    return this;
  }

  // Text Formatting
  underline(mode = 0) { // 0 = off, 1 = 1-dot, 2 = 2-dot
    this._enqueue(new Uint8Array([0x1b, 0x2d, mode]));
    return this;
  }

  invert(on = true) { // White/Black Reverse Printing Mode
    this._enqueue(new Uint8Array([0x1d, 0x42, on ? 1 : 0]));
    return this;
  }

  emphasize(on = true) { // Emphasized Mode
    this._enqueue(new Uint8Array([0x1b, 0x45, on ? 1 : 0]));
    return this;
  }

  doubleStrike(on = true) { // Double-Strike Mode
    this._enqueue(new Uint8Array([0x1b, 0x47, on ? 1 : 0]));
    return this;
  }

  // Character Set
  setCharacterSet(charset = 'PC437') {
    const charCodeMap = {
      'PC437': 0x00, // USA, Standard Europe
      'KATAKANA': 0x01,
      'PC850': 0x02, // Multilingual
      'PC860': 0x03, // Portuguese
      'PC863': 0x04, // Canadian-French
      'PC865': 0x05, // Nordic
      'WPC1252': 0x10, // Windows Latin-1
      'PC866': 0x12, // Cyrillic #2
      'PC852': 0x13, // Latin-2
      'PC858': 0x14, // Euro
      // Add more as needed
    };
    const code = charCodeMap[charset.toUpperCase()] || 0x00; // Default to PC437
    this._enqueue(new Uint8Array([0x1b, 0x74, code]));
    return this;
  }

  // Barcode
  printBarcode(data, type, height = 50, width = 2, font = 0, align = 'left') {
    // GS H n (Height of barcode)
    this._enqueue(new Uint8Array([0x1d, 0x48, font])); // Set HRI character position (0=not printed, 1=above, 2=below, 3=both)
    this._enqueue(new Uint8Array([0x1d, 0x77, width])); // Set barcode width (2-6)
    this._enqueue(new Uint8Array([0x1d, 0x68, height])); // Set barcode height (1-255)

    let alignCode = 0x00; // Left
    if (align === 'center') {
      alignCode = 0x01;
    } else if (align === 'right') {
      alignCode = 0x02;
    }
    this._enqueue(new Uint8Array([0x1b, 0x61, alignCode])); // Set alignment

    // GS k m n d1...dn
    // GS k m n d1...dn (type B)
    let barcodeType;
    switch (type.toUpperCase()) {
      case 'UPC-A': barcodeType = 0x00; break;
      case 'UPC-E': barcodeType = 0x01; break;
      case 'EAN13': barcodeType = 0x02; break;
      case 'EAN8': barcodeType = 0x03; break;
      case 'CODE39': barcodeType = 0x04; break;
      case 'ITF': barcodeType = 0x05; break;
      case 'CODABAR': barcodeType = 0x06; break;
      case 'CODE93': barcodeType = 0x49; break;
      case 'CODE128': barcodeType = 0x4a; break;
      default: throw new Error('Unsupported barcode type');
    }

    const dataBuffer = new TextEncoder().encode(data);
    this._enqueue(new Uint8Array([0x1d, 0x6b, barcodeType, dataBuffer.length, ...dataBuffer]));
    return this;
  }

  // QR Code
  printQRCode(data, cellSize = 3, correctionLevel = 'M') {
    // Correction Level: L = 1, M = 0, Q = 3, H = 2
    let qrCorrectionLevel = 0x31; // M

    switch (correctionLevel.toUpperCase()) {
      case 'L': qrCorrectionLevel = 0x30; break;
      case 'M': qrCorrectionLevel = 0x31; break;
      case 'Q': qrCorrectionLevel = 0x32; break;
      case 'H': qrCorrectionLevel = 0x33; break;
    }

    const dataBuffer = new TextEncoder().encode(data);
    const len = dataBuffer.length + 3; // +3 for protocol

    // GS ( k P_L P_H cn fn n1 n2
    // fn 65: select model
    this._enqueue(new Uint8Array([0x1d, 0x28, 0x6b, 0x04, 0x00, 0x31, 0x41, 0x32, 0x00]));
    // fn 67: set size of module
    this._enqueue(new Uint8Array([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x43, cellSize]));
    // fn 69: set error correction level
    this._enqueue(new Uint8Array([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x45, qrCorrectionLevel]));
    // fn 80: store data
    this._enqueue(new Uint8Array([0x1d, 0x28, 0x6b, len % 256, Math.floor(len / 256), 0x31, 0x50, 0x30, ...dataBuffer]));
    // fn 81: print QR code
    this._enqueue(new Uint8Array([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x51, 0x30]));

    return this;
  }
}

// Helper to convert Uint8Array to base64 (useful for bridges expecting base64)
export function toBase64(u8) {
  let binary = '';
  const len = u8.length;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(u8[i]);
  }
  return btoa(binary);
}

// Build a simple receipt using helper commands
export function buildReceipt({ header = [], lines = [], footer = [] } = {}) {
  const encoder = new EscPosEncoder();

  encoder.alignCenter();
  encoder.boldOn();
  encoder.size(0x11); // larger header
  for (const h of header) {
    encoder.text(h);
    encoder.newline();
  }
  encoder.size(0);
  encoder.boldOff();
  encoder.newline();

  encoder.alignLeft();
  for (const l of lines) {
    encoder.text(l);
    encoder.newline();
  }
  encoder.newline();

  encoder.alignCenter();
  for (const f of footer) {
    encoder.text(f);
    encoder.newline();
  }

  encoder.feed(3);
  encoder.cut();

  return encoder.encode();
}

export { toBase64, buildReceipt };
export default EscPosEncoder;