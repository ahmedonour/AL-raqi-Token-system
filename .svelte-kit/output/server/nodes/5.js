

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/5.D4GgkQuy.js","_app/immutable/chunks/CCedcCd3.js","_app/immutable/chunks/CcVvRlv2.js","_app/immutable/chunks/BcbAq8Qb.js","_app/immutable/chunks/BcLYq_V8.js","_app/immutable/chunks/BtGFON0Z.js","_app/immutable/chunks/CF3gQrKK.js","_app/immutable/chunks/DYczJ95w.js"];
export const stylesheets = ["_app/immutable/assets/5.OZh1NJTn.css"];
export const fonts = [];
