import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const hasPrinterPermission = writable(true);

