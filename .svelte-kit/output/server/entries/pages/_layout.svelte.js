import { s as subscribe } from "../../chunks/utils2.js";
import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { $ as $locale } from "../../chunks/runtime.js";
const css = {
  code: ".language-switcher.svelte-18q2mhw.svelte-18q2mhw{background:none;border:none;cursor:pointer;padding:8px;color:var(--text-dark);position:fixed;top:10px;right:10px;z-index:1000}.language-switcher.svelte-18q2mhw svg.svelte-18q2mhw{width:24px;height:24px}.language-switcher.svelte-18q2mhw.svelte-18q2mhw:hover{color:var(--primary)}",
  map: `{"version":3,"file":"LanguageSwitcher.svelte","sources":["LanguageSwitcher.svelte"],"sourcesContent":["<script>\\n    import { locale } from 'svelte-i18n';\\n    import { onMount } from 'svelte';\\n\\n    let currentLocale;\\n\\n    onMount(() => {\\n        // Initialize currentLocale from the store\\n        const unsubscribe = locale.subscribe(value => {\\n            currentLocale = value;\\n        });\\n        return () => unsubscribe(); // Cleanup subscription\\n    });\\n\\n    function toggleLocale() {\\n        let newLocale = currentLocale === 'ar' ? 'en' : 'ar';\\n        locale.set(newLocale);\\n        localStorage.setItem('locale', newLocale); // Persist the selection\\n    }\\n<\/script>\\n\\n<button on:click={toggleLocale} class=\\"language-switcher\\">\\n    <!-- Globe Icon (using a simple SVG for demonstration) -->\\n    <svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" class=\\"feather feather-globe\\">\\n        <circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"></circle>\\n        <line x1=\\"2\\" y1=\\"12\\" x2=\\"22\\" y2=\\"12\\"></line>\\n        <path d=\\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\\"></path>\\n    </svg>\\n</button>\\n\\n<style>\\n    .language-switcher {\\n        background: none;\\n        border: none;\\n        cursor: pointer;\\n        padding: 8px;\\n        color: var(--text-dark); /* Using a variable from app.css */\\n        position: fixed;\\n        top: 10px;\\n        right: 10px;\\n        z-index: 1000;\\n    }\\n\\n    .language-switcher svg {\\n        width: 24px;\\n        height: 24px;\\n    }\\n\\n    .language-switcher:hover {\\n        color: var(--primary); /* Using a variable from app.css */\\n    }\\n</style>\\n"],"names":[],"mappings":"AA+BI,gDAAmB,CACf,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IACb,CAEA,iCAAkB,CAAC,kBAAI,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACZ,CAEA,gDAAkB,MAAO,CACrB,KAAK,CAAE,IAAI,SAAS,CACxB"}`
};
const LanguageSwitcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<button class="language-switcher svelte-18q2mhw" data-svelte-h="svelte-1zf8pz"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe svelte-18q2mhw"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> </button>`;
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
  return `${validate_component(LanguageSwitcher, "LanguageSwitcher").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
