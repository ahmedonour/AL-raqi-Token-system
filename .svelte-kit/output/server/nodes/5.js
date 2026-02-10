

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/5.D4u46Wru.js","_app/immutable/chunks/CBAgXpWv.js","_app/immutable/chunks/B5JCov3p.js"];
export const stylesheets = ["_app/immutable/assets/5.DiEuR1Lr.css"];
export const fonts = [];
