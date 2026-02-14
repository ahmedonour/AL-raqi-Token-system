

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.F4KAV-qS.js","_app/immutable/chunks/CCedcCd3.js","_app/immutable/chunks/CcVvRlv2.js","_app/immutable/chunks/BcbAq8Qb.js","_app/immutable/chunks/BcLYq_V8.js","_app/immutable/chunks/BtGFON0Z.js","_app/immutable/chunks/CF3gQrKK.js","_app/immutable/chunks/DYczJ95w.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
