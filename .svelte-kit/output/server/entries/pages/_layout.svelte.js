import { s as subscribe } from "../../chunks/utils2.js";
import { c as create_ssr_component } from "../../chunks/ssr.js";
import { $ as $locale } from "../../chunks/runtime.js";
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
  return `${$locale$1 ? `${slots.default ? slots.default({}) : ``}` : ``}`;
});
export {
  Layout as default
};
