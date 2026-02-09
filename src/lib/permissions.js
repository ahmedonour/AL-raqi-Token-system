import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function getCookie(name) {
    if (!browser) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function setCookie(name, value, days) {
    if (!browser) return;
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const initialPermission = browser ? getCookie('printerPermission') === 'granted' : false;
export const hasPrinterPermission = writable(initialPermission);

hasPrinterPermission.subscribe(value => {
    if (browser) {
        if (value) {
            setCookie('printerPermission', 'granted', 365);
        } else {
            setCookie('printerPermission', 'denied', 365);
        }
    }
});
