

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.C5VTBg49.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BdT7tXd5.js","_app/immutable/chunks/DL4xa8HJ.js","_app/immutable/chunks/CBAgXpWv.js","_app/immutable/chunks/B5JCov3p.js"];
export const stylesheets = ["_app/immutable/assets/0.DkeVgVCB.css"];
export const fonts = [];
