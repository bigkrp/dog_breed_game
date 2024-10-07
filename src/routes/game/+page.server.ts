import type { PageServerLoad } from './$types'
import { breedProvider } from '$lib/stores/breedStore'
import { imageDataProvider } from '$lib/stores/imagesStore'

export const load: PageServerLoad = async () => {
    const breeds = await breedProvider()
    const imageData = await imageDataProvider()

    return {
        breeds,
        imageData,
    }
}
