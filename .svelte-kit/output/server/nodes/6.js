

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/6.B49l-av6.js","_app/immutable/chunks/BqjfsWb9.js","_app/immutable/chunks/CeLvkrgE.js","_app/immutable/chunks/C4Owg0pQ.js","_app/immutable/chunks/C5RtevZq.js","_app/immutable/chunks/C239elDA.js","_app/immutable/chunks/gcEaKgZV.js"];
export const stylesheets = ["_app/immutable/assets/6.D9hHSDvY.css"];
export const fonts = [];
