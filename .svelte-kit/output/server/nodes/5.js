

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/5.B-wpd15b.js","_app/immutable/chunks/Cm-2GWLV.js","_app/immutable/chunks/cbwSijS1.js","_app/immutable/chunks/DVCxTcJf.js","_app/immutable/chunks/BK54zpuR.js","_app/immutable/chunks/Cm3K6lye.js","_app/immutable/chunks/dG-Rhb6l.js","_app/immutable/chunks/Bet7gbAl.js"];
export const stylesheets = ["_app/immutable/assets/5.E3GsFesV.css"];
export const fonts = [];
