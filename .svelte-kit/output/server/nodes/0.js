

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.qR_xGAKM.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BVDECMgz.js","_app/immutable/chunks/CcYY5e-7.js","_app/immutable/chunks/DfyVJTpe.js","_app/immutable/chunks/C4CklrCk.js"];
export const stylesheets = ["_app/immutable/assets/0.5TZDqfVQ.css"];
export const fonts = [];
