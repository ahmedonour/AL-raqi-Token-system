

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.2NGTYRsO.js","_app/immutable/chunks/CBAgXpWv.js","_app/immutable/chunks/B5JCov3p.js","_app/immutable/chunks/DsPtLc_C.js","_app/immutable/chunks/yhBqU7Q1.js","_app/immutable/chunks/DL4xa8HJ.js","_app/immutable/chunks/C1I1J8-N.js","_app/immutable/chunks/BdT7tXd5.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
