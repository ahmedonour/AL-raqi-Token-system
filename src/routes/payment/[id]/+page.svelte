<script>
	import { page } from '$app/stores';
	import { sections, tokenCounter } from '$lib/stores';
	import { goto } from '$app/navigation';
	
	$: sectionId = parseInt($page.params.id);
	$: section = $sections.find(s => s.id === sectionId);
	
	let isPaid = false;

	function handlePayment() {
		isPaid = true;
	}

	function generateToken() {
		if (!section) return;

		tokenCounter.increment();
		const currentTokenNumber = $tokenCounter;
		
		const token = {
			number: currentTokenNumber,
			sectionId: section.id,
			sectionName: section.name,
			timestamp: new Date().toISOString(),
			price: section.price
		};

		sections.addToQueue(section.id, token);
		
		goto(`/token/${currentTokenNumber}?section=${section.id}`);
	}

	function goBack() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Payment - {section?.name || 'Loading...'}</title>
</svelte:head>

<div class="container">
	{#if section}
		<div class="payment-card">
			<button class="back-btn no-print" on:click={goBack}>
				← Back
			</button>

			<div class="section-header">
				<div class="icon">
					{section.type === 'clinic' ? '🩺' : '🔬'}
				</div>
				<h2>{section.name}</h2>
				<p class="type-badge">{section.type === 'clinic' ? 'Clinic' : 'Laboratory'}</p>
			</div>

			{#if !isPaid}
				<div class="price-section">
					<p class="price-label">Service Fee</p>
					<p class="price-amount">{section.price} SDG</p>
				</div>

				<button class="pay-btn" on:click={handlePayment}>
					💳 Proceed to Payment
				</button>

				<p class="info-text">
					Please proceed to the cashier for manual payment.
				</p>
			{:else}
				<div class="paid-section">
					<div class="checkmark">✓</div>
					<p class="paid-text">Payment Confirmed</p>
					<p class="paid-amount">{section.price} SDG</p>
				</div>

				<button class="token-btn" on:click={generateToken}>
					🎫 Generate Token
				</button>

				<p class="info-text">
					Click above to generate your queue token.
				</p>
			{/if}
		</div>
	{:else}
		<div class="payment-card">
			<p class="error-text">Section not found</p>
			<button class="back-btn" on:click={goBack}>
				← Return to Home
			</button>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.payment-card {
		background: white;
		padding: 3rem;
		border-radius: 1.5rem;
		box-shadow: var(--shadow-lg);
		width: 100%;
	}

	.back-btn {
		background: transparent;
		color: var(--text-light);
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-weight: 600;
		margin-bottom: 2rem;
		transition: all 0.2s;
	}

	.back-btn:hover {
		background: var(--bg-light);
		color: var(--text-dark);
	}

	.section-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.section-header h2 {
		color: var(--text-dark);
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.type-badge {
		display: inline-block;
		background: var(--primary);
		color: white;
		padding: 0.25rem 1rem;
		border-radius: 1rem;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.price-section {
		text-align: center;
		padding: 2rem;
		background: var(--bg-light);
		border-radius: 1rem;
		margin-bottom: 2rem;
	}

	.price-label {
		color: var(--text-light);
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.price-amount {
		color: var(--primary);
		font-size: 3rem;
		font-weight: 700;
	}

	.pay-btn, .token-btn {
		width: 100%;
		background: var(--primary);
		color: white;
		padding: 1.25rem;
		border-radius: 0.75rem;
		font-size: 1.25rem;
		font-weight: 700;
		transition: all 0.3s;
		margin-bottom: 1rem;
	}

	.pay-btn:hover, .token-btn:hover {
		background: var(--primary-dark);
		transform: translateY(-2px);
		box-shadow: var(--shadow);
	}

	.token-btn {
		background: var(--success);
	}

	.token-btn:hover {
		background: #059669;
	}

	.info-text {
		text-align: center;
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.paid-section {
		text-align: center;
		padding: 2rem;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 1rem;
		margin-bottom: 2rem;
	}

	.checkmark {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: white;
		color: var(--success);
		font-size: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
		font-weight: 700;
	}

	.paid-text {
		color: white;
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.paid-amount {
		color: rgba(255, 255, 255, 0.9);
		font-size: 2rem;
		font-weight: 600;
	}

	.error-text {
		text-align: center;
		color: var(--danger);
		font-size: 1.25rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.payment-card {
			padding: 2rem;
		}
	}
</style>
