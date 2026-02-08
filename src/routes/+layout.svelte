<script>
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
			// Only register the service worker in production.
			// During development a service worker can interfere with Vite's HMR websocket.
			if ('serviceWorker' in navigator) {
				if (import.meta.env && import.meta.env.PROD) {
					navigator.serviceWorker.register('/sw.js')
						.then((registration) => {
							console.log('Service Worker registered:', registration);
						})
						.catch((error) => {
							console.log('Service Worker registration failed:', error);
						});
				} else {
					// In dev: unregister any previously-registered service worker to avoid HMR issues
					navigator.serviceWorker.getRegistrations()
						.then(regs => {
							for (const r of regs) {
								r.unregister();
							}
						})
						.catch(() => {});
				}
			}
	});
</script>

<slot />
