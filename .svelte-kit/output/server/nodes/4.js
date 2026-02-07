

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.DBlvxaVT.js","_app/immutable/chunks/Cx-SMqmV.js","_app/immutable/chunks/BRdh1MfX.js","_app/immutable/chunks/sPPYXTHL.js","_app/immutable/chunks/By-VsvpK.js","_app/immutable/chunks/D3w1Xed-.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
