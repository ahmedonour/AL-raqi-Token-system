import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default sections
const defaultSections = [
	{ id: 1, name: 'General Medicine', type: 'clinic', price: 100, queue: [] },
	{ id: 2, name: 'Pediatrics', type: 'clinic', price: 120, queue: [] },
	{ id: 3, name: 'Cardiology', type: 'clinic', price: 150, queue: [] },
	{ id: 4, name: 'Orthopedics', type: 'clinic', price: 150, queue: [] },
	{ id: 5, name: 'Dermatology', type: 'clinic', price: 130, queue: [] },
	{ id: 6, name: 'Blood Test', type: 'laboratory', price: 80, queue: [] },
	{ id: 7, name: 'X-Ray', type: 'laboratory', price: 200, queue: [] },
	{ id: 8, name: 'Ultrasound', type: 'laboratory', price: 250, queue: [] },
	{ id: 9, name: 'CT Scan', type: 'laboratory', price: 500, queue: [] },
	{ id: 10, name: 'MRI', type: 'laboratory', price: 800, queue: [] }
];

// Load from localStorage or use defaults
function loadSections() {
	if (browser) {
		const stored = localStorage.getItem('hospital_sections');
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (e) {
				return defaultSections;
			}
		}
	}
	return defaultSections;
}

// Create sections store
function createSectionsStore() {
	const { subscribe, set, update } = writable(loadSections());

	return {
		subscribe,
		add: (section) => update(sections => {
			const newSection = {
				...section,
				id: Math.max(...sections.map(s => s.id), 0) + 1,
				queue: []
			};
			const updated = [...sections, newSection];
			if (browser) localStorage.setItem('hospital_sections', JSON.stringify(updated));
			return updated;
		}),
		remove: (id) => update(sections => {
			const updated = sections.filter(s => s.id !== id);
			if (browser) localStorage.setItem('hospital_sections', JSON.stringify(updated));
			return updated;
		}),
		update: (id, changes) => update(sections => {
			const updated = sections.map(s => s.id === id ? { ...s, ...changes } : s);
			if (browser) localStorage.setItem('hospital_sections', JSON.stringify(updated));
			return updated;
		}),
		addToQueue: (sectionId, token) => update(sections => {
			const updated = sections.map(s => {
				if (s.id === sectionId) {
					return {
						...s,
						queue: [...s.queue, token]
					};
				}
				return s;
			});
			if (browser) localStorage.setItem('hospital_sections', JSON.stringify(updated));
			return updated;
		}),
		removeFromQueue: (sectionId, tokenNumber) => update(sections => {
			const updated = sections.map(s => {
				if (s.id === sectionId) {
					return {
						...s,
						queue: s.queue.filter(t => t.number !== tokenNumber)
					};
				}
				return s;
			});
			if (browser) localStorage.setItem('hospital_sections', JSON.stringify(updated));
			return updated;
		}),
		reset: () => {
			if (browser) localStorage.setItem('hospital_sections', JSON.stringify(defaultSections));
			set(defaultSections);
		}
	};
}

export const sections = createSectionsStore();

// Token counter
function createTokenCounter() {
	const initial = browser ? parseInt(localStorage.getItem('token_counter') || '0') : 0;
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
		increment: () => update(n => {
			const newValue = n + 1;
			if (browser) localStorage.setItem('token_counter', String(newValue));
			return newValue;
		}),
		reset: () => {
			if (browser) localStorage.setItem('token_counter', '0');
			set(0);
		}
	};
}

export const tokenCounter = createTokenCounter();
