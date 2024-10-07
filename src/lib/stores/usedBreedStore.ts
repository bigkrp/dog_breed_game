import { writable } from 'svelte/store'

export const usedBreedStore = writable(new Set<number>())
