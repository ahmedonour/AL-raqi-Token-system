import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "@capacitor/core";
import { e as escape } from "../../../chunks/escape.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div style="padding:1rem"><h2 data-svelte-h="svelte-1duw1un">SUNMI Print Test</h2> <p data-svelte-h="svelte-17f8sxt">Use this page to test the print wrapper locally. In production on a SUNMI device the native bridge will be used.</p> <div style="display:flex;gap:8px;"><button data-svelte-h="svelte-11ao671">Mock SUNMI Printer</button> <button data-svelte-h="svelte-o60fui">Test Print</button> <button data-svelte-h="svelte-149gwqk">Check SUNMI</button></div> <p style="margin-top:1rem">Mocked: ${escape("no")}</p> ${``}</div>`;
});
export {
  Page as default
};
