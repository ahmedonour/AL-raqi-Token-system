

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.BFfgLggN.js","_app/immutable/chunks/BqjfsWb9.js","_app/immutable/chunks/CeLvkrgE.js","_app/immutable/chunks/C4Owg0pQ.js","_app/immutable/chunks/C5RtevZq.js","_app/immutable/chunks/C239elDA.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
