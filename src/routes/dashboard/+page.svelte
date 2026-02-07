<script>
	import { sections, tokenCounter } from '$lib/stores';
	import { goto } from '$app/navigation';

	let activeTab = 'sections';
	let showAddModal = false;
	let editingSection = null;

	let formData = {
		name: '',
		type: 'clinic',
		price: 100
	};

	function resetForm() {
		formData = {
			name: '',
			type: 'clinic',
			price: 100
		};
		editingSection = null;
	}

	function openAddModal() {
		resetForm();
		showAddModal = true;
	}

	function openEditModal(section) {
		formData = {
			name: section.name,
			type: section.type,
			price: section.price
		};
		editingSection = section;
		showAddModal = true;
	}

	function closeModal() {
		showAddModal = false;
		resetForm();
	}

	function handleSubmit() {
		if (!formData.name || formData.price <= 0) {
			alert('Please fill all fields correctly');
			return;
		}

		if (editingSection) {
			sections.update(editingSection.id, formData);
		} else {
			sections.add(formData);
		}

		closeModal();
	}

	function deleteSection(id) {
		if (confirm('Are you sure you want to delete this section?')) {
			sections.remove(id);
		}
	}

	function removeFromQueue(sectionId, tokenNumber) {
		if (confirm(`Remove token #${tokenNumber} from queue?`)) {
			sections.removeFromQueue(sectionId, tokenNumber);
		}
	}

	function resetAllData() {
		if (confirm('This will reset all sections and queues to default. Are you sure?')) {
			sections.reset();
			tokenCounter.reset();
		}
	}

	function goHome() {
		goto('/');
	}

	$: totalInQueue = $sections.reduce((sum, s) => sum + s.queue.length, 0);
	$: totalRevenue = $sections.reduce((sum, s) => 
		sum + s.queue.reduce((qSum, t) => qSum + t.price, 0), 0
	);
</script>

<svelte:head>
	<title>Dashboard - AL Raqi University Hospital</title>
</svelte:head>

<div class="dashboard">
	<header class="dashboard-header">
		<div>
			<h1>🏥 Dashboard</h1>
			<p>AL Raqi University Hospital - Admin Panel</p>
		</div>
		<button class="home-btn" on:click={goHome}>
			← Back to Home
		</button>
	</header>

	<!-- Stats Cards -->
	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-icon">📋</div>
			<div>
				<p class="stat-label">Total Sections</p>
				<p class="stat-value">{$sections.length}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">⏳</div>
			<div>
				<p class="stat-label">In Queue</p>
				<p class="stat-value">{totalInQueue}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🎫</div>
			<div>
				<p class="stat-label">Total Tokens</p>
				<p class="stat-value">{$tokenCounter}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">💰</div>
			<div>
				<p class="stat-label">Today's Revenue</p>
				<p class="stat-value">{totalRevenue} SDG</p>
			</div>
		</div>
	</div>

	<!-- Tabs -->
	<div class="tabs">
		<button 
			class="tab" 
			class:active={activeTab === 'sections'}
			on:click={() => activeTab = 'sections'}
		>
			Sections Management
		</button>
		<button 
			class="tab" 
			class:active={activeTab === 'queues'}
			on:click={() => activeTab = 'queues'}
		>
			Queue Monitor
		</button>
	</div>

	<!-- Sections Management Tab -->
	{#if activeTab === 'sections'}
		<div class="content-panel">
			<div class="panel-header">
				<h2>Sections & Services</h2>
				<div class="panel-actions">
					<button class="add-btn" on:click={openAddModal}>
						+ Add Section
					</button>
					<button class="reset-btn" on:click={resetAllData}>
						Reset All
					</button>
				</div>
			</div>

			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Type</th>
							<th>Price (SDG)</th>
							<th>Queue</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each $sections as section (section.id)}
							<tr>
								<td>{section.id}</td>
								<td>
									<div class="section-name">
										<span class="section-icon">
											{section.type === 'clinic' ? '🩺' : '🔬'}
										</span>
										{section.name}
									</div>
								</td>
								<td>
									<span class="badge badge-{section.type}">
										{section.type}
									</span>
								</td>
								<td>{section.price}</td>
								<td>
									<span class="queue-badge">
										{section.queue.length}
									</span>
								</td>
								<td>
									<div class="action-btns">
										<button 
											class="edit-btn" 
											on:click={() => openEditModal(section)}
										>
											Edit
										</button>
										<button 
											class="delete-btn" 
											on:click={() => deleteSection(section.id)}
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- Queue Monitor Tab -->
	{#if activeTab === 'queues'}
		<div class="content-panel">
			<div class="panel-header">
				<h2>Live Queue Monitor</h2>
			</div>

			<div class="queues-grid">
				{#each $sections as section (section.id)}
					{#if section.queue.length > 0}
						<div class="queue-card">
							<div class="queue-header">
								<div>
									<h3>{section.name}</h3>
									<p class="queue-count">{section.queue.length} waiting</p>
								</div>
								<span class="section-icon-large">
									{section.type === 'clinic' ? '🩺' : '🔬'}
								</span>
							</div>
							
							<div class="queue-list">
								{#each section.queue as token, index (token.number)}
									<div class="queue-item" class:first={index === 0}>
										<div class="token-info">
											<span class="token-number">#{token.number}</span>
											<span class="token-time">
												{new Date(token.timestamp).toLocaleTimeString()}
											</span>
										</div>
										<button 
											class="remove-btn"
											on:click={() => removeFromQueue(section.id, token.number)}
										>
											✕
										</button>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			{#if totalInQueue === 0}
				<div class="empty-state">
					<p>No tokens in queue</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Add/Edit Modal -->
{#if showAddModal}
	<div
		class="modal-overlay"
		on:click={closeModal}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				closeModal();
			}
		}}
		role="button"
		tabindex="0"
	>
		<div class="modal" on:click|stopPropagation>
			<div class="modal-header">
				<h2>{editingSection ? 'Edit Section' : 'Add New Section'}</h2>
				<button class="close-btn" on:click={closeModal}>✕</button>
			</div>

			<form on:submit|preventDefault={handleSubmit}>
				<div class="form-group">
					<label for="name">Section Name</label>
					<input 
						id="name"
						type="text" 
						bind:value={formData.name}
						placeholder="e.g., Cardiology"
						required
					/>
				</div>

				<div class="form-group">
					<label for="type">Type</label>
					<select id="type" bind:value={formData.type}>
						<option value="clinic">Clinic</option>
						<option value="laboratory">Laboratory</option>
					</select>
				</div>

				<div class="form-group">
					<label for="price">Price (SDG)</label>
					<input 
						id="price"
						type="number" 
						bind:value={formData.price}
						min="1"
						required
					/>
				</div>

				<div class="modal-actions">
					<button type="button" class="cancel-btn" on:click={closeModal}>
						Cancel
					</button>
					<button type="submit" class="submit-btn">
						{editingSection ? 'Update' : 'Add'} Section
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.dashboard {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
	}

	.dashboard-header {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: var(--shadow);
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.dashboard-header h1 {
		color: var(--primary);
		font-size: 2rem;
		margin-bottom: 0.25rem;
	}

	.dashboard-header p {
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.home-btn {
		background: var(--primary);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.home-btn:hover {
		background: var(--primary-dark);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		padding: 1.5rem;
		border-radius: 0.75rem;
		box-shadow: var(--shadow);
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.stat-icon {
		font-size: 2.5rem;
	}

	.stat-label {
		color: var(--text-light);
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}

	.stat-value {
		color: var(--text-dark);
		font-size: 1.75rem;
		font-weight: 700;
	}

	.tabs {
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

	.content-panel {
		background: white;
		border-radius: 1rem;
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.panel-header {
		padding: 2rem;
		border-bottom: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.panel-header h2 {
		color: var(--text-dark);
		font-size: 1.5rem;
	}

	.panel-actions {
		display: flex;
		gap: 1rem;
	}

	.add-btn {
		background: var(--success);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.add-btn:hover {
		background: #059669;
	}

	.reset-btn {
		background: var(--danger);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.reset-btn:hover {
		background: #dc2626;
	}

	.table-container {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: var(--bg-light);
	}

	th {
		padding: 1rem;
		text-align: left;
		color: var(--text-dark);
		font-weight: 600;
		font-size: 0.9rem;
	}

	td {
		padding: 1rem;
		border-top: 1px solid var(--border);
		color: var(--text-dark);
	}

	.section-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.section-icon {
		font-size: 1.25rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.badge-clinic {
		background: #dbeafe;
		color: #1e40af;
	}

	.badge-laboratory {
		background: #fce7f3;
		color: #9f1239;
	}

	.queue-badge {
		display: inline-block;
		background: var(--primary);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.action-btns {
		display: flex;
		gap: 0.5rem;
	}

	.edit-btn, .delete-btn {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		font-size: 0.9rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.edit-btn {
		background: var(--primary);
		color: white;
	}

	.edit-btn:hover {
		background: var(--primary-dark);
	}

	.delete-btn {
		background: var(--danger);
		color: white;
	}

	.delete-btn:hover {
		background: #dc2626;
	}

	.queues-grid {
		padding: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.queue-card {
		border: 2px solid var(--border);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.queue-header {
		background: var(--bg-light);
		padding: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.queue-header h3 {
		color: var(--text-dark);
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}

	.queue-count {
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.section-icon-large {
		font-size: 2.5rem;
	}

	.queue-list {
		max-height: 400px;
		overflow-y: auto;
	}

	.queue-item {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: background 0.2s;
	}

	.queue-item:hover {
		background: var(--bg-light);
	}

	.queue-item.first {
		background: #fef3c7;
		border-left: 4px solid var(--warning);
	}

	.token-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.token-number {
		color: var(--text-dark);
		font-weight: 700;
		font-size: 1.1rem;
	}

	.token-time {
		color: var(--text-light);
		font-size: 0.85rem;
	}

	.remove-btn {
		background: transparent;
		color: var(--text-light);
		width: 32px;
		height: 32px;
		border-radius: 50%;
		font-size: 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.remove-btn:hover {
		background: var(--danger);
		color: white;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: var(--text-light);
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal {
		background: white;
		border-radius: 1rem;
		box-shadow: var(--shadow-lg);
		max-width: 500px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		padding: 2rem;
		border-bottom: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-header h2 {
		color: var(--text-dark);
		font-size: 1.5rem;
	}

	.close-btn {
		background: transparent;
		color: var(--text-light);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: var(--bg-light);
		color: var(--text-dark);
	}

	form {
		padding: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		color: var(--text-dark);
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	input, select {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid var(--border);
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus, select:focus {
		outline: none;
		border-color: var(--primary);
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	.cancel-btn, .submit-btn {
		flex: 1;
		padding: 0.75rem;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.cancel-btn {
		background: white;
		color: var(--text-dark);
		border: 2px solid var(--border);
	}

	.cancel-btn:hover {
		background: var(--bg-light);
	}

	.submit-btn {
		background: var(--primary);
		color: white;
	}

	.submit-btn:hover {
		background: var(--primary-dark);
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: 1rem;
		}

		.dashboard-header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.tabs {
			flex-direction: column;
		}

		.panel-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.panel-actions {
			width: 100%;
			flex-direction: column;
		}

		.queues-grid {
			grid-template-columns: 1fr;
		}

		table {
			font-size: 0.85rem;
		}

		th, td {
			padding: 0.75rem 0.5rem;
		}
	}
</style>
