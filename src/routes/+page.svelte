<script>
	import { sections } from '$lib/stores';
	import { printToken } from '$lib/sunmiPrinter.js';
	import { goto } from '$app/navigation';

	let filter = 'all';

	$: filteredSections = filter === 'all' 
		? $sections 
		: $sections.filter(s => s.type === filter);

	function selectSection(section) {
		goto(`/payment/${section.id}`);
	}

	async function printSmallToken() {
		const now = new Date();
		const first = $sections && $sections.length ? $sections[0] : null;
		const tokenData = {
			number: 'T-' + Math.floor(Math.random() * 900 + 100),
			section: first ? first.name : 'General',
			type: first ? (first.type === 'clinic' ? 'Clinic' : 'Laboratory') : 'Clinic',
			fee: first ? first.price : 0,
			date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}),
			time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
			position: 1,
			total: 1
		};

		try {
			await printToken(tokenData);
			console.log('Print small token requested', tokenData);
		} catch (e) {
			console.error('Print failed', e);
			alert('Printing failed — see console for details');
		}
	}
</script>

<svelte:head>
	<title>AL Raqi University Hospital - Token System</title>
</svelte:head>

<div class="container">
	<header>
		<div class="logo">
			<div class="logo-icon">🏥</div>
			<div>
				<h1>AL Raqi University Hospital</h1>
				<p>Token Management System</p>
			</div>
		</div>
		<a href="/dashboard" class="admin-btn no-print">
			<span>⚙️</span> Dashboard
		</a>
	</header>

	<div class="filter-tabs no-print">
		<button 
			class="tab" 
			class:active={filter === 'all'}
			on:click={() => filter = 'all'}
		>
			All Services
		</button>
		<button 
			class="tab" 
			class:active={filter === 'clinic'}
			on:click={() => filter = 'clinic'}
		>
			Clinics
		</button>
		<button 
			class="tab" 
			class:active={filter === 'laboratory'}
			on:click={() => filter = 'laboratory'}
		>
			Laboratories
		</button>
	</div>

	<div class="sections-grid">
		{#each filteredSections as section (section.id)}
			<button class="section-card" on:click={() => selectSection(section)}>
				<div class="icon">
					{section.type === 'clinic' ? '🩺' : '🔬'}
				</div>
				<h3>{section.name}</h3>
				<div class="price">{section.price} SDG</div>
				<div class="queue-info">
					{section.queue.length} in queue
				</div>
			</button>
		{/each}
	</div>

	{#if filteredSections.length === 0}
		<div class="empty-state">
			<p>No sections available. Please contact administrator.</p>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
	}

	header {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: var(--shadow-lg);
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.logo {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.logo-icon {
		font-size: 3rem;
	}

	.logo h1 {
		color: var(--primary);
		font-size: 1.75rem;
		margin-bottom: 0.25rem;
	}

	.logo p {
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.admin-btn {
		background: var(--primary);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.admin-btn:hover {
		background: var(--primary-dark);
		transform: translateY(-2px);
		box-shadow: var(--shadow);
	}

	.filter-tabs {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		background: white;
		padding: 1rem;
		border-radius: 0.75rem;
		box-shadow: var(--shadow);
	}

	.tab {
		flex: 1;
		padding: 0.75rem 1.5rem;
		background: transparent;
		color: var(--text-light);
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.tab:hover {
		background: var(--bg-light);
		color: var(--text-dark);
	}

	.tab.active {
		background: var(--primary);
		color: white;
	}

	.sections-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.section-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: var(--shadow);
		transition: all 0.3s;
		text-align: center;
		border: 2px solid transparent;
	}

	.section-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
		border-color: var(--primary);
	}

	.icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.section-card h3 {
		color: var(--text-dark);
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.price {
		color: var(--primary);
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.queue-info {
		color: var(--text-light);
		font-size: 0.9rem;
		padding: 0.5rem;
		background: var(--bg-light);
		border-radius: 0.5rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		background: white;
		border-radius: 1rem;
		box-shadow: var(--shadow);
	}

	.empty-state p {
		color: var(--text-light);
		font-size: 1.1rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.logo {
			flex-direction: column;
		}

		.sections-grid {
			grid-template-columns: 1fr;
		}

		.filter-tabs {
			flex-direction: column;
		}
	}
</style>
