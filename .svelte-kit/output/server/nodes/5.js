

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/5.B6-JM3el.js","_app/immutable/chunks/CFfMwYxK.js","_app/immutable/chunks/CBAgXpWv.js","_app/immutable/chunks/B5JCov3p.js","_app/immutable/chunks/BjgYNh5i.js","_app/immutable/chunks/DqdH9-6q.js","_app/immutable/chunks/DL4xa8HJ.js","_app/immutable/chunks/C1I1J8-N.js","_app/immutable/chunks/BdT7tXd5.js","_app/immutable/chunks/j6nhZCV2.js","_app/immutable/chunks/C1FmrZbK.js"];
export const stylesheets = ["_app/immutable/assets/5.YiqZ8XlN.css"];
export const fonts = [];
