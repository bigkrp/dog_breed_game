import type { ImagesData } from '$lib/stores/imagesStore'
import type { TheDogApiBreed } from '$lib/stores/breedStore'

export const getImagePath = (
    imageData: Record<string, ImagesData>,
    breedToGuess: TheDogApiBreed | undefined,
) => {
    const id = breedToGuess?.id ?? 0
    try {
        return `images/breeds/${id}_${imageData[id].w}x${imageData[id].h}${imageData[id].extension}`
    } catch (error) {
        if (error instanceof Error) {
            console.debug('Error while trying get image path', error.message)
        }
    }
    return ''
}
