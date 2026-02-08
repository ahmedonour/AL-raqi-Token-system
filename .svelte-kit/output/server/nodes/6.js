

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/6.Czoz-dZC.js","_app/immutable/chunks/DfyVJTpe.js","_app/immutable/chunks/C4CklrCk.js","_app/immutable/chunks/CPKiFbIO.js","_app/immutable/chunks/Cmn7x47L.js","_app/immutable/chunks/CcYY5e-7.js","_app/immutable/chunks/Dh-yYehQ.js","_app/immutable/chunks/FqtPCAbL.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D1H6M1Qj.js","_app/immutable/chunks/BVDECMgz.js"];
export const stylesheets = ["_app/immutable/assets/6.BM4-J17j.css"];
export const fonts = [];
