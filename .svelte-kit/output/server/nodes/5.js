

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/5.CPKzOKI1.js","_app/immutable/chunks/H_iquXZA.js","_app/immutable/chunks/74oKnm7Q.js","_app/immutable/chunks/Crxm-zH5.js","_app/immutable/chunks/DvhzlPJ8.js","_app/immutable/chunks/BMz4Sitn.js","_app/immutable/chunks/C_QjJRU1.js","_app/immutable/chunks/DVuTZ6Zw.js"];
export const stylesheets = ["_app/immutable/assets/5.YiqZ8XlN.css"];
export const fonts = [];
