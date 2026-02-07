

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.CyVLjGMm.js","_app/immutable/chunks/Cx-SMqmV.js","_app/immutable/chunks/BRdh1MfX.js","_app/immutable/chunks/DX3C1iXx.js","_app/immutable/chunks/Dm48oB20.js","_app/immutable/chunks/DuzmWgzi.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
