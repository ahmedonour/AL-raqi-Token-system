

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.D7k2qz5s.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DVuTZ6Zw.js","_app/immutable/chunks/BMz4Sitn.js","_app/immutable/chunks/H_iquXZA.js","_app/immutable/chunks/74oKnm7Q.js"];
export const stylesheets = ["_app/immutable/assets/0.DJC-20MH.css"];
export const fonts = [];
