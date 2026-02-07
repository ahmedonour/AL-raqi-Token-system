// Minimal ESC/POS encoder for basic receipt printing
// Produces Uint8Array containing ESC/POS commands

function concatBuffers(buffers) {
  const total = buffers.reduce((s, b) => s + b.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const b of buffers) {
    out.set(b, offset);
    offset += b.length;
  }
  return out;
}

export function text(t = '') {
  return new TextEncoder().encode(t);
}

export function newline(n = 1) {
  return new Uint8Array(new Array(n).fill(0x0a));
}

export function alignLeft() { return new Uint8Array([0x1b, 0x61, 0x00]); }
export function alignCenter() { return new Uint8Array([0x1b, 0x61, 0x01]); }
export function alignRight() { return new Uint8Array([0x1b, 0x61, 0x02]); }

export function boldOn() { return new Uint8Array([0x1b, 0x45, 0x01]); }
export function boldOff() { return new Uint8Array([0x1b, 0x45, 0x00]); }

// Size: n = 0..7 where (width, height) bits combined. 0 = normal, 0x11 = double width+height
export function size(n = 0) { return new Uint8Array([0x1d, 0x21, n]); }

export function cut() { return new Uint8Array([0x1d, 0x56, 0x00]); }

export function feed(n = 1) { return new Uint8Array([0x1b, 0x64, n]); }

// Build a simple receipt using helper commands
export function buildReceipt({ header = [], lines = [], footer = [] } = {}) {
  const parts = [];

  parts.push(alignCenter());
  parts.push(boldOn());
  parts.push(size(0x11)); // larger header
  for (const h of header) {
    parts.push(text(h + '\n'));
  }
  parts.push(size(0));
  parts.push(boldOff());
  parts.push(newline());

  parts.push(alignLeft());
  for (const l of lines) {
    parts.push(text(l + '\n'));
  }
  parts.push(newline());

  parts.push(alignCenter());
  for (const f of footer) {
    parts.push(text(f + '\n'));
  }

  parts.push(feed(3));
  parts.push(cut());

  return concatBuffers(parts);
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

export default { text, newline, alignLeft, alignCenter, alignRight, boldOn, boldOff, size, cut, feed, buildReceipt, toBase64 };
