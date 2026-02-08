

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_id_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/payment/[id]/+page.js";
export const imports = ["_app/immutable/nodes/4.0_oa5DYv.js","_app/immutable/chunks/Cm-2GWLV.js","_app/immutable/chunks/cbwSijS1.js","_app/immutable/chunks/DVCxTcJf.js","_app/immutable/chunks/BK54zpuR.js","_app/immutable/chunks/Cm3K6lye.js","_app/immutable/chunks/dG-Rhb6l.js","_app/immutable/chunks/Bet7gbAl.js"];
export const stylesheets = ["_app/immutable/assets/4.Dj6xhKBA.css"];
export const fonts = [];
