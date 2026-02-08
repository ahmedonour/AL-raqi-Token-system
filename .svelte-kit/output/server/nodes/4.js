

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.Em9R7ldM.js","_app/immutable/chunks/H_iquXZA.js","_app/immutable/chunks/74oKnm7Q.js","_app/immutable/chunks/Crxm-zH5.js","_app/immutable/chunks/DvhzlPJ8.js","_app/immutable/chunks/BMz4Sitn.js","_app/immutable/chunks/C_QjJRU1.js","_app/immutable/chunks/DVuTZ6Zw.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
