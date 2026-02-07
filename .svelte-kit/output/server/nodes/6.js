

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/token/_number_/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/token/[number]/+page.js";
export const imports = ["_app/immutable/nodes/6.B0vm7g0n.js","_app/immutable/chunks/Cx-SMqmV.js","_app/immutable/chunks/BRdh1MfX.js","_app/immutable/chunks/DX3C1iXx.js","_app/immutable/chunks/Dm48oB20.js","_app/immutable/chunks/DuzmWgzi.js","_app/immutable/chunks/DaPtPcvu.js","_app/immutable/chunks/C1FmrZbK.js"];
export const stylesheets = ["_app/immutable/assets/6.D9hHSDvY.css"];
export const fonts = [];
