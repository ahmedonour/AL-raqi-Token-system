<script>
    import { locale } from 'svelte-i18n';
    import { onMount } from 'svelte';

    let currentLocale;

    onMount(() => {
        // Initialize currentLocale from the store
        const unsubscribe = locale.subscribe(value => {
            currentLocale = value;
        });
        return () => unsubscribe(); // Cleanup subscription
    });

    function toggleLocale() {
        let newLocale = currentLocale === 'ar' ? 'en' : 'ar';
        locale.set(newLocale);
        localStorage.setItem('locale', newLocale); // Persist the selection
    }
</script>

<button on:click={toggleLocale} class="language-switcher">
    <!-- Globe Icon (using a simple SVG for demonstration) -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
</button>

<style>
    .language-switcher {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        color: var(--text-dark); /* Using a variable from app.css */
    }

    .language-switcher svg {
        width: 24px;
        height: 24px;
    }

    .language-switcher:hover {
        color: var(--primary); /* Using a variable from app.css */
    }
</style>
