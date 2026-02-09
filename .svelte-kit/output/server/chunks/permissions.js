import { w as writable } from "./index.js";
const initialPermission = false;
const hasPrinterPermission = writable(initialPermission);
hasPrinterPermission.subscribe((value) => {
});
export {
  hasPrinterPermission as h
};
