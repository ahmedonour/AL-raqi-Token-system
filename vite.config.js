import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			manifest: {
				filename: 'manifest.json',
				name: 'AL Raqi University Hospital Token System',
				short_name: 'Token System',
				description: 'AL Raqi University Hospital Token System',
				theme_color: '#0891b2',
				icons: [
					{
						src: 'icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			// Add Workbox configuration to precache index.html
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
				navigateFallback: 'index.html', // Ensure index.html is the fallback for SPA
			}
		})
	],
	ssr: {
		noExternal: ['@capacitor-community/bluetooth-le']
	}
});
