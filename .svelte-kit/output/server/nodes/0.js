

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Cw0xxjxQ.js","_app/immutable/chunks/BqjfsWb9.js","_app/immutable/chunks/CeLvkrgE.js"];
export const stylesheets = ["_app/immutable/assets/0.Bz0jjyCb.css"];
export const fonts = [];
