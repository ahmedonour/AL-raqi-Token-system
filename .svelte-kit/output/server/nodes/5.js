

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/print-test/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.Db2FWE0t.js","_app/immutable/chunks/BqjfsWb9.js","_app/immutable/chunks/CeLvkrgE.js","_app/immutable/chunks/gcEaKgZV.js"];
export const stylesheets = [];
export const fonts = [];
