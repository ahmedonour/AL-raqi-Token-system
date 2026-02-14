

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DuhE6hOZ.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DYczJ95w.js","_app/immutable/chunks/BtGFON0Z.js","_app/immutable/chunks/CCedcCd3.js","_app/immutable/chunks/CcVvRlv2.js"];
export const stylesheets = ["_app/immutable/assets/0.DkeVgVCB.css"];
export const fonts = [];
