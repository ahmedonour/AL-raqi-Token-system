
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/dashboard" | "/payment" | "/payment/[id]" | "/token" | "/token/[number]";
		RouteParams(): {
			"/payment/[id]": { id: string };
			"/token/[number]": { number: string }
		};
		LayoutParams(): {
			"/": { id?: string; number?: string };
			"/dashboard": Record<string, never>;
			"/payment": { id?: string };
			"/payment/[id]": { id: string };
			"/token": { number?: string };
			"/token/[number]": { number: string }
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/" | "/payment" | "/payment/" | `/payment/${string}` & {} | `/payment/${string}/` & {} | "/token" | "/token/" | `/token/${string}` & {} | `/token/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/icon-192.png" | "/icon-192.svg" | "/icon-512.png" | "/icon-512.svg" | "/manifest.json" | "/manifest.webmanifest" | "/sw.js" | string & {};
	}
}