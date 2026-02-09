<script>
    import { hasPrinterPermission } from '$lib/permissions';
    import { _ } from 'svelte-i18n';

    function allow() {
        hasPrinterPermission.set(true);
    }

    function deny() {
        hasPrinterPermission.set(false); // We can still set it to 'denied' to not ask again
        // Or we could have a more complex state management
    }
</script>

{#if !$hasPrinterPermission}
<div class="overlay">
    <div class="modal">
        <h2>{$_('permissions.modal.title')}</h2>
        <p>{$_('permissions.modal.message')}</p>
        <div class="actions">
            <button class="allow" on:click={allow}>{$_('permissions.modal.allow')}</button>
            <button class="deny" on:click={deny}>{$_('permissions.modal.deny')}</button>
        </div>
    </div>
</div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 400px;
        text-align: center;
    }
    h2 {
        color: var(--text-dark);
        margin-bottom: 1rem;
    }
    p {
        color: var(--text-light);
        margin-bottom: 2rem;
    }
    .actions {
        display: flex;
        gap: 1rem;
    }
    button {
        flex: 1;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-weight: 600;
    }
    .allow {
        background: var(--primary);
        color: white;
    }
    .deny {
        background: var(--bg-light);
        color: var(--text-dark);
    }
</style>
