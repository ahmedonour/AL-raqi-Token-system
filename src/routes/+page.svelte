<script>
	import { sections } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n'; // Import the $_ function

	let filter = 'all';

	$: filteredSections = filter === 'all' 
		? $sections 
		: $sections.filter(s => s.type === filter);

	function selectSection(section) {
		goto(`/payment/${section.id}`);
	}
</script>

<svelte:head>
	<title>{$_('hospital.title')} - {$_('hospital.tokenManagementSystem')}</title>
</svelte:head>

<div class="container">
	<header>
		<div class="logo">
			<div class="logo-icon">🏥</div>
			<div>
				<h1>{$_('hospital.title')}</h1>
				<p>{$_('hospital.tokenManagementSystem')}</p>
			</div>
		</div>
		<a href="/dashboard" class="admin-btn no-print">
			<span>⚙️</span> {$_('dashboard')}
		</a>
	</header>

	<div class="filter-tabs no-print">
		<button 
			class="tab" 
			class:active={filter === 'all'}
			on:click={() => filter = 'all'}
		>
			{$_('filters.allServices')}
		</button>
		<button 
			class="tab" 
			class:active={filter === 'clinic'}
			on:click={() => filter = 'clinic'}
		>
			{$_('filters.clinics')}
		</button>
		<button 
			class="tab" 
			class:active={filter === 'laboratory'}
			on:click={() => filter = 'laboratory'}
		>
			{$_('filters.laboratories')}
		</button>
	</div>

	<div class="sections-grid">
		{#each filteredSections as section (section.id)}
			<button class="section-card" on:click={() => selectSection(section)}>
				<div class="icon">
					{section.type === 'clinic' ? '🩺' : '🔬'}
				</div>
				<h3>{section.name}</h3>
				<div class="price">{section.price} {$_('currency')}</div>
				<div class="queue-info">
					{$_('queue.inQueue', { values: { count: section.queue.length } })}
				</div>
			</button>
		{/each}
	</div>

	{#if filteredSections.length === 0}
		<div class="empty-state">
			<p>{$_('emptyState.noSections')}</p>
		</div>
	{/if}

	<div class="apk-download-section no-print">
		<a href="https://drive.google.com/uc?export=download&id=1lhJs5pDNY4WLclb_KNkj3jgPUXXnhZWv" target="_blank" rel="noopener noreferrer" class="download-apk-btn">
			📦 {$_('downloadApk')}
		</a>
	</div>
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
		margin-bottom: 2rem; /* Add some space before the download button */
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
		margin-bottom: 2rem; /* Add some space before the download button */
	}

	.empty-state p {
		color: var(--text-light);
		font-size: 1.1rem;
	}

	.apk-download-section {
		text-align: center;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px dashed var(--border);
	}

	.download-apk-btn {
		display: inline-block;
		background: var(--success);
		color: white;
		padding: 1rem 2rem;
		border-radius: 0.75rem;
		font-size: 1.2rem;
		font-weight: 700;
		text-decoration: none;
		transition: all 0.3s;
		box-shadow: var(--shadow);
	}

	.download-apk-btn:hover {
		background: #059669; /* Darker success color */
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
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
