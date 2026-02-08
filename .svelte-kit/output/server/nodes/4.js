

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.C_z9y4Vs.js","_app/immutable/chunks/DfyVJTpe.js","_app/immutable/chunks/C4CklrCk.js","_app/immutable/chunks/CPKiFbIO.js","_app/immutable/chunks/Cmn7x47L.js","_app/immutable/chunks/CcYY5e-7.js","_app/immutable/chunks/Dh-yYehQ.js","_app/immutable/chunks/BVDECMgz.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
