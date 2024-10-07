// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { TheDogApiBreed } from '$lib/stores/breedStore'
import type { ImagesData } from '$lib/stores/imagesStore'

declare global {
    namespace App {
        interface PageData {
            breeds?: TheDogApiBreed[]
            imageData?: Record<string, ImagesData>
        }
    }
}

export {}
