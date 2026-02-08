

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B9vTHGO0.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bet7gbAl.js","_app/immutable/chunks/Cm3K6lye.js","_app/immutable/chunks/Cm-2GWLV.js","_app/immutable/chunks/cbwSijS1.js"];
export const stylesheets = ["_app/immutable/assets/0.DJC-20MH.css"];
export const fonts = [];
