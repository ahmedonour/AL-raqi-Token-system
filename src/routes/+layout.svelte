<script>
	import '../app.css';
	import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import PermissionModal from '$lib/components/PermissionModal.svelte';

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

    // Reactive statement to update html lang attribute and add class for Arabic font
    $: if ($locale) {
        document.documentElement.setAttribute('lang', $locale);
        if ($locale === 'ar') {
            document.documentElement.classList.add('lang-ar');
        } else {
            document.documentElement.classList.remove('lang-ar');
        }
    }
</script>

{#if $locale}
    <PermissionModal />
	<slot />
{/if}
