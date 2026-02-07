<script>
	import { page } from '$app/stores';
	import { sections } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isSunmiAvailable, printToken as sunmiPrint } from '$lib/sunmiPrinter.js';
	
	$: tokenNumber = parseInt($page.params.number);
	$: sectionId = parseInt($page.url.searchParams.get('section') || '0');
	$: section = $sections.find(s => s.id === sectionId);
	$: token = section?.queue.find(t => t.number === tokenNumber);
	
	let currentDate = '';
	let currentTime = '';

	onMount(() => {
		updateDateTime();
		const interval = setInterval(updateDateTime, 1000);
		return () => clearInterval(interval);
	});

	function updateDateTime() {
		const now = new Date();
		currentDate = now.toLocaleDateString('en-US', { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
		currentTime = now.toLocaleTimeString('en-US');
	}

	async function printToken() {
		// Only run printing in browser
		if (typeof window === 'undefined') return;

		const position = section ? (section.queue.findIndex(t => t.number === tokenNumber) + 1) : '-';
		const total = section ? section.queue.length : '-';

		const tokenData = {
			number: tokenNumber,
			section: section?.name,
			type: section?.type === 'clinic' ? 'Clinic' : (section?.type || '-'),
			fee: section?.price,
			date: currentDate,
			time: currentTime,
			position,
			total
		};

		if (isSunmiAvailable()) {
			try {
				await sunmiPrint(tokenData);
			} catch (err) {
				console.error('SUNMI print failed, falling back to browser print', err);
				window.print && window.print();
			}
		} else {
			window.print && window.print();
		}
	}

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Token #{tokenNumber} - AL Raqi University Hospital</title>
</svelte:head>

<div class="container">
	<div class="token-card">
		<!-- Print Header -->
		<div class="print-header">
			<div class="hospital-logo">🏥</div>
			<h1>AL Raqi University Hospital</h1>
			<p class="subtitle">Queue Token</p>
		</div>

		<!-- Token Number -->
		<div class="token-number-section">
			<p class="label">Your Token Number</p>
			<div class="token-number">{tokenNumber}</div>
		</div>

		<!-- Section Info -->
		{#if section}
			<div class="section-info">
				<div class="info-row">
					<span class="info-label">Section:</span>
					<span class="info-value">{section.name}</span>
				</div>
				<div class="info-row">
					<span class="info-label">Type:</span>
					<span class="info-value">{section.type === 'clinic' ? 'Clinic' : 'Laboratory'}</span>
				</div>
				<div class="info-row">
					<span class="info-label">Fee Paid:</span>
					<span class="info-value">{section.price} SDG</span>
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
				<p class="queue-label">Position in Queue</p>
				<p class="queue-number">
					{section.queue.findIndex(t => t.number === tokenNumber) + 1} / {section.queue.length}
				</p>
			</div>
		{/if}

		<!-- Instructions -->
		<div class="instructions">
			<h3>Instructions:</h3>
			<ul>
				<li>Please wait for your number to be called</li>
				<li>Keep this token with you at all times</li>
				<li>Listen for announcements in the waiting area</li>
				<li>If you miss your turn, please inform the reception</li>
			</ul>
		</div>

		<!-- Action Buttons -->
		<div class="actions no-print">
			<button class="print-btn" on:click={printToken}>
				🖨️ Print Token
			</button>
			<button class="home-btn" on:click={goHome}>
				🏠 Back to Home
			</button>
		</div>

		<!-- Footer -->
		<div class="token-footer">
			<p>Thank you for choosing AL Raqi University Hospital</p>
			<p class="small">For emergencies, please contact our emergency department immediately</p>
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
		padding: 3rem;
		border-radius: 1.5rem;
		box-shadow: var(--shadow-lg);
		width: 100%;
	}

	.print-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 2px dashed var(--border);
	}

	.hospital-logo {
		font-size: 4rem;
		margin-bottom: 0.5rem;
	}

	.print-header h1 {
		color: var(--primary);
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		color: var(--text-light);
		font-size: 1.1rem;
	}

	.token-number-section {
		text-align: center;
		margin: 2rem 0;
		padding: 2rem;
		background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
		border-radius: 1rem;
	}

	.label {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.token-number {
		color: white;
		font-size: 6rem;
		font-weight: 900;
		line-height: 1;
		text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	}

	.section-info {
		margin: 2rem 0;
		padding: 1.5rem;
		background: var(--bg-light);
		border-radius: 0.75rem;
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
		margin: 2rem 0;
		padding: 1rem;
		background: var(--bg-light);
		border-radius: 0.75rem;
	}

	.date {
		color: var(--text-dark);
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.time {
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.queue-position {
		text-align: center;
		margin: 2rem 0;
		padding: 1.5rem;
		border: 2px solid var(--primary);
		border-radius: 0.75rem;
	}

	.queue-label {
		color: var(--text-light);
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.queue-number {
		color: var(--primary);
		font-size: 2.5rem;
		font-weight: 700;
	}

	.instructions {
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
	}

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
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 2px dashed var(--border);
	}

	.token-footer p {
		color: var(--text-light);
		margin-bottom: 0.5rem;
	}

	.small {
		font-size: 0.85rem;
	}

	@media print {
		.container {
			padding: 0;
		}

		.token-card {
			box-shadow: none;
			border-radius: 0;
		}

		.token-number {
			font-size: 8rem;
		}
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