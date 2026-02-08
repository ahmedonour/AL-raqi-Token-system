import { r as registerLocaleLoader, i as init } from "../../chunks/runtime.js";
registerLocaleLoader("en", () => import("../../chunks/en.js"));
registerLocaleLoader("ar", () => import("../../chunks/ar.js"));
const initialLocale = typeof localStorage !== "undefined" && localStorage.getItem("locale") || "ar";
init({
  fallbackLocale: "en",
  initialLocale
});
const prerender = true;
const ssr = false;
export {
  prerender,
  ssr
};
