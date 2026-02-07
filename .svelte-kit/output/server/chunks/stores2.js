import { w as writable } from "./index.js";
const defaultSections = [
  { id: 1, name: "General Medicine", type: "clinic", price: 100, queue: [] },
  { id: 2, name: "Pediatrics", type: "clinic", price: 120, queue: [] },
  { id: 3, name: "Cardiology", type: "clinic", price: 150, queue: [] },
  { id: 4, name: "Orthopedics", type: "clinic", price: 150, queue: [] },
  { id: 5, name: "Dermatology", type: "clinic", price: 130, queue: [] },
  { id: 6, name: "Blood Test", type: "laboratory", price: 80, queue: [] },
  { id: 7, name: "X-Ray", type: "laboratory", price: 200, queue: [] },
  { id: 8, name: "Ultrasound", type: "laboratory", price: 250, queue: [] },
  { id: 9, name: "CT Scan", type: "laboratory", price: 500, queue: [] },
  { id: 10, name: "MRI", type: "laboratory", price: 800, queue: [] }
];
function loadSections() {
  return defaultSections;
}
function createSectionsStore() {
  const { subscribe, set, update } = writable(loadSections());
  return {
    subscribe,
    add: (section) => update((sections2) => {
      const newSection = {
        ...section,
        id: Math.max(...sections2.map((s) => s.id), 0) + 1,
        queue: []
      };
      const updated = [...sections2, newSection];
      return updated;
    }),
    remove: (id) => update((sections2) => {
      const updated = sections2.filter((s) => s.id !== id);
      return updated;
    }),
    update: (id, changes) => update((sections2) => {
      const updated = sections2.map((s) => s.id === id ? { ...s, ...changes } : s);
      return updated;
    }),
    addToQueue: (sectionId, token) => update((sections2) => {
      const updated = sections2.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            queue: [...s.queue, token]
          };
        }
        return s;
      });
      return updated;
    }),
    removeFromQueue: (sectionId, tokenNumber) => update((sections2) => {
      const updated = sections2.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            queue: s.queue.filter((t) => t.number !== tokenNumber)
          };
        }
        return s;
      });
      return updated;
    }),
    reset: () => {
      set(defaultSections);
    }
  };
}
const sections = createSectionsStore();
function createTokenCounter() {
  const initial = 0;
  const { subscribe, set, update } = writable(initial);
  return {
    subscribe,
    increment: () => update((n) => {
      const newValue = n + 1;
      return newValue;
    }),
    reset: () => {
      set(0);
    }
  };
}
const tokenCounter = createTokenCounter();
export {
  sections as s,
  tokenCounter as t
};
