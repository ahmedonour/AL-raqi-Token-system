import { s as subscribe } from "../../chunks/utils2.js";
import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { $ as $format, a as $locale } from "../../chunks/runtime.js";
import { w as writable } from "../../chunks/index.js";
import { e as escape } from "../../chunks/escape.js";
const hasPrinterPermission = writable(true);
const css = {
  code: ".overlay.svelte-vrr2gk{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:1000}.modal.svelte-vrr2gk{background:white;padding:2rem;border-radius:1rem;max-width:400px;text-align:center}h2.svelte-vrr2gk{color:var(--text-dark);margin-bottom:1rem}p.svelte-vrr2gk{color:var(--text-light);margin-bottom:2rem}.actions.svelte-vrr2gk{display:flex;gap:1rem}button.svelte-vrr2gk{flex:1;padding:0.75rem;border-radius:0.5rem;font-weight:600}.allow.svelte-vrr2gk{background:var(--primary);color:white}.deny.svelte-vrr2gk{background:var(--bg-light);color:var(--text-dark)}",
  map: `{"version":3,"file":"PermissionModal.svelte","sources":["PermissionModal.svelte"],"sourcesContent":["<script>\\n    import { hasPrinterPermission } from '$lib/permissions';\\n    import { _ } from 'svelte-i18n';\\n\\n    function allow() {\\n        hasPrinterPermission.set(true);\\n    }\\n\\n    function deny() {\\n        hasPrinterPermission.set(false); // We can still set it to 'denied' to not ask again\\n        // Or we could have a more complex state management\\n    }\\n<\/script>\\n\\n{#if !$hasPrinterPermission}\\n<div class=\\"overlay\\">\\n    <div class=\\"modal\\">\\n        <h2>{$_('permissions.modal.title')}</h2>\\n        <p>{$_('permissions.modal.message')}</p>\\n        <div class=\\"actions\\">\\n            <button class=\\"allow\\" on:click={allow}>{$_('permissions.modal.allow')}</button>\\n            <button class=\\"deny\\" on:click={deny}>{$_('permissions.modal.deny')}</button>\\n        </div>\\n    </div>\\n</div>\\n{/if}\\n\\n<style>\\n    .overlay {\\n        position: fixed;\\n        top: 0;\\n        left: 0;\\n        right: 0;\\n        bottom: 0;\\n        background: rgba(0,0,0,0.7);\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        z-index: 1000;\\n    }\\n    .modal {\\n        background: white;\\n        padding: 2rem;\\n        border-radius: 1rem;\\n        max-width: 400px;\\n        text-align: center;\\n    }\\n    h2 {\\n        color: var(--text-dark);\\n        margin-bottom: 1rem;\\n    }\\n    p {\\n        color: var(--text-light);\\n        margin-bottom: 2rem;\\n    }\\n    .actions {\\n        display: flex;\\n        gap: 1rem;\\n    }\\n    button {\\n        flex: 1;\\n        padding: 0.75rem;\\n        border-radius: 0.5rem;\\n        font-weight: 600;\\n    }\\n    .allow {\\n        background: var(--primary);\\n        color: white;\\n    }\\n    .deny {\\n        background: var(--bg-light);\\n        color: var(--text-dark);\\n    }\\n</style>\\n"],"names":[],"mappings":"AA4BI,sBAAS,CACL,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,IACb,CACA,oBAAO,CACH,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,MAChB,CACA,gBAAG,CACC,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,aAAa,CAAE,IACnB,CACA,eAAE,CACE,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,aAAa,CAAE,IACnB,CACA,sBAAS,CACL,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACT,CACA,oBAAO,CACH,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,OAAO,CAChB,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,GACjB,CACA,oBAAO,CACH,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,KAAK,CAAE,KACX,CACA,mBAAM,CACF,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,WAAW,CAC1B"}`
};
const PermissionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPrinterPermission, $$unsubscribe_hasPrinterPermission;
  let $_, $$unsubscribe__;
  $$unsubscribe_hasPrinterPermission = subscribe(hasPrinterPermission, (value) => $hasPrinterPermission = value);
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  $$result.css.add(css);
  $$unsubscribe_hasPrinterPermission();
  $$unsubscribe__();
  return `${!$hasPrinterPermission ? `<div class="overlay svelte-vrr2gk"><div class="modal svelte-vrr2gk"><h2 class="svelte-vrr2gk">${escape($_("permissions.modal.title"))}</h2> <p class="svelte-vrr2gk">${escape($_("permissions.modal.message"))}</p> <div class="actions svelte-vrr2gk"><button class="allow svelte-vrr2gk">${escape($_("permissions.modal.allow"))}</button> <button class="deny svelte-vrr2gk">${escape($_("permissions.modal.deny"))}</button></div></div></div>` : ``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $locale$1, $$unsubscribe_locale;
  $$unsubscribe_locale = subscribe($locale, (value) => $locale$1 = value);
  {
    if ($locale$1) {
      document.documentElement.setAttribute("lang", $locale$1);
      if ($locale$1 === "ar") {
        document.documentElement.classList.add("lang-ar");
      } else {
        document.documentElement.classList.remove("lang-ar");
      }
    }
  }
  $$unsubscribe_locale();
  return `${$locale$1 ? `${validate_component(PermissionModal, "PermissionModal").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}` : ``}`;
});
export {
  Layout as default
};
