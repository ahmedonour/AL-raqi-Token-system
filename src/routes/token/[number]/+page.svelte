<script>
	import { page } from '$app/stores';
	import { sections } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import BluetoothPrinter from '$lib/components/BluetoothPrinter.svelte';
	
	$: tokenNumber = parseInt($page.params.number);
	$: sectionId = parseInt($page.url.searchParams.get('section') || '0');
	$: section = $sections.find(s => s.id === sectionId);
	$: token = section?.queue.find(t => t.number === tokenNumber);
	
	let currentDate = '';
	let currentTime = '';
	let bluetoothPrinter;

	onMount(() => {
		updateDateTime();
		const interval = setInterval(updateDateTime, 1000);
		return () => clearInterval(interval);
	});

	function updateDateTime() {
		const now = new Date();
		currentDate = now.toLocaleDateString(undefined, { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
		currentTime = now.toLocaleTimeString(undefined);
	}

	async function printToken() {
		// Only run printing in browser
		if (typeof window === 'undefined') return;

		if (bluetoothPrinter && bluetoothPrinter.print) {
			const textToPrint = `
${$_('hospital.title')}
${$_('tokenPage.subtitle')}

${$_('tokenPage.yourTokenNumber')}: ${tokenNumber}

${$_('tokenPage.section')}: ${section.name}
${$_('tokenPage.type')}: ${section.type === 'clinic' ? $_('tokenPage.clinic') : $_('tokenPage.laboratory')}
${$_('tokenPage.feePaid')}: ${section.price} ${$_('currency')}

${currentDate}
${currentTime}

${$_('queue.positionInQueue')}: ${section.queue.findIndex(t => t.number === tokenNumber) + 1} / ${section.queue.length}

${$_('tokenPage.thankYouMessage')}
			`;
			await bluetoothPrinter.print(textToPrint);
		} else {
			// Fallback to window.print if bluetooth is not available
			window.print && window.print();
		}
	}

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>{$_('tokenPage.yourTokenNumber')} #{tokenNumber} - {$_('hospital.title')}</title>
</svelte:head>

<div class="container">
	<div class="token-card">
		<!-- Print Header -->
		<div class="print-header">
			<div class="hospital-logo">🏥</div>
			<h1>{$_('hospital.title')}</h1>
			<p class="subtitle">{$_('tokenPage.subtitle')}</p>
		</div>

		<!-- Token Number -->
		<div class="token-number-section">
			<p class="label">{$_('tokenPage.yourTokenNumber')}</p>
			<div class="token-number">{tokenNumber}</div>
		</div>

		<!-- Section Info -->
		{#if section}
			<div class="section-info">
				<div class="info-row">
					<span class="info-label">{$_('tokenPage.section')}</span>
					<span class="info-value">{section.name}</span>
				</div>
				<div class="info-row">
					<span class="info-label">{$_('tokenPage.type')}</span>
					<span class="info-value">{section.type === 'clinic' ? $_('tokenPage.clinic') : $_('tokenPage.laboratory')}</span>
				</div>
				<div class="info-row">
					<span class="info-label">{$_('tokenPage.feePaid')}</span>
					<span class="info-value">{section.price} {$_('currency')}</span>
				</div>
			</div>
		{/if}

		<!-- Date & Time -->
		<div class="datetime-section">
			<p class="date">{currentDate}</p>
			<p class="time">{currentTime}</p>
		</div>

		<!-- Queue Position -->
		{#if section}
			<div class="queue-position">
				<p class="queue-label">{$_('queue.positionInQueue')}</p>
				<p class="queue-number">
					{section.queue.findIndex(t => t.number === tokenNumber) + 1} / {section.queue.length}
				</p>
			</div>
		{/if}

		<!-- Instructions -->
		<!-- Instructions removed per request -->

		<!-- Action Buttons -->
		<div class="actions no-print">
			<button class="print-btn" on:click={printToken}>
				🖨️ {$_('tokenPage.printToken')}
			</button>
			<button class="home-btn" on:click={goHome}>
				🏠 {$_('tokenPage.backToHome')}
			</button>
		</div>

		<div class="no-print">
			<BluetoothPrinter bind:this={bluetoothPrinter} />
		</div>

		<!-- Footer -->
		<div class="token-footer">
			<p class="footer-main">{$_('tokenPage.thankYouMessage')} <br> {$_('hospital.title')}</p>
			<!-- <p class="footer-urgent">For emergencies, please contact …</p> -->
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.token-card {
		background: white;
		padding: 1.25rem;
		border-radius: 1.5rem;
		box-shadow: var(--shadow-lg);
		width: 100%;
	}

	.print-header {
		text-align: center;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 2px dashed var(--border);
	}

		.hospital-logo {
			font-size: 2.4rem;
			margin-bottom: 0.25rem;
		}

	.print-header h1 {
		color: var(--primary);
		font-size: 1.6rem;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		color: var(--text-light);
		font-size: 1rem;
	}

		.token-number-section {
			text-align: center;
			margin: 0.75rem 0;
			padding: 0.5rem 0.75rem;
			background: #ffffff; /* B/W */
			border-radius: 0.5rem;
			border: 1px solid #000;
		}

		.label {
			color: #000;
			font-size: 0.7rem;
			margin-bottom: 0.15rem;
			font-weight: 600;
			line-height: 0.95;
		}

		.token-number {
			color: #000;
			font-size: 2.4rem;
			font-weight: 900;
			line-height: 0.95;
			text-shadow: none;
		}

		.section-info {
			margin: 0.25rem 0;
			padding: 0.5rem;
			background: transparent;
			border-radius: 0.5rem;
		}

	.info-row {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-label {
		color: var(--text-light);
		font-weight: 600;
	}

	.info-value {
		color: var(--text-dark);
		font-weight: 600;
	}

		.datetime-section {
			text-align: center;
			margin: 0.5rem 0;
			padding: 0.5rem;
			background: var(--bg-light);
			border-radius: 0.5rem;
		}

		.date {
			color: #000;
			font-size: 0.7rem;
			font-weight: 600;
			margin-bottom: 0;
			line-height: 1.2;
		}

		.time {
			color: #000;
			font-size: 0.65rem;
			margin-top: 0;
			line-height: 1.2;
		}

		.queue-position {
			text-align: center;
			margin: 0.5rem 0;
			padding: 0.5rem;
			border: 1px solid var(--primary);
			border-radius: 0.5rem;
		}

		.queue-label {
			color: #000;
			font-size: 0.65rem;
			margin-bottom: 0.1rem;
			line-height: 0.9;
		}

		.queue-number {
			color: #000;
			font-size: 1.1rem;
			font-weight: 700;
			line-height: 0.95;
		}

	/* .instructions {
		margin: 2rem 0;
		padding: 1.5rem;
		background: #fef3c7;
		border-left: 4px solid var(--warning);
		border-radius: 0.5rem;
	}

	.instructions h3 {
		color: var(--text-dark);
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.instructions ul {
		list-style-position: inside;
		color: var(--text-dark);
	}

	.instructions li {
		margin-bottom: 0.5rem;
		line-height: 1.5;
	} */

	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 2rem 0;
	}

	.print-btn, .home-btn {
		padding: 1rem;
		border-radius: 0.75rem;
		font-size: 1.1rem;
		font-weight: 700;
		transition: all 0.2s;
	}

	.print-btn {
		background: var(--primary);
		color: white;
	}

	.print-btn:hover {
		background: var(--primary-dark);
		transform: translateY(-2px);
		box-shadow: var(--shadow);
	}

	.home-btn {
		background: white;
		color: var(--primary);
		border: 2px solid var(--primary);
	}

	.home-btn:hover {
		background: var(--bg-light);
	}

		.token-footer {
			text-align: center;
			margin-top: 0.5rem;
			padding-top: 0.5rem;
			border-top: 1px dashed var(--border);
		}

		.token-footer p {
			color: #000;
			margin-bottom: 0.15rem;
			font-size: 0.5rem;
			line-height: 1.2;
		}

		.footer-main {
			font-size: 0.5rem;
			font-weight: 700;
			line-height: 0.95;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* .footer-urgent {
			font-size: 0.65rem;
			line-height: 0.95;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.small {
			font-size: 0.7rem;
		} */

	@media print {
		/* Target thermal 80mm receipts: compact layout */
		@page { size: 80mm auto; margin: 4mm; }

		/* html, body {
			background: white;
		} */

		.container {
			padding: 0;
			width: 280px; /* approx 80mm at common DPI */
			margin: 0;
		}

		.token-card {
			box-shadow: none;
			border-radius: 0;
			padding: 8px;
			width: 100%;
			background: white;
			color: #000;
		}

		.print-header h1 {
			font-size: 15px;
			margin: 2px 0;
		}

		.subtitle { font-size: 11px; margin-bottom: 4px; }

		.hospital-logo { font-size: 20px; }

		.token-number-section { padding: 6px; margin: 6px 0; }

		.label { font-size: 10px; color: #000; }

		.token-number {
			font-size: 32px;
			font-weight: 800;
			color: #000;
			padding: 2px 0;
		}
		/* add .instructions here later when you decide on content */
		.section-info, .datetime-section, .queue-position, .token-footer {
			padding: 6px 2px;
			margin: 4px 0;
			background: transparent;
			border: none;
		}

		.info-row { padding: 4px 0; border-bottom: none; font-size: 11px; }

		/* .instructions { font-size: 10px; } */

		.token-footer { font-size: 10px; margin-top: 8px; }

		/* Hide interactive elements when printing */
		.no-print { display: none !important; }

		/* Ensure compact spacing */
		* { box-sizing: border-box; }
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.token-card {
			padding: 2rem;
		}

		.token-number {
			font-size: 4rem;
		}

		.actions {
			grid-template-columns: 1fr;
		}
	}
</style>