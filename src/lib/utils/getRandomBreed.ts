import type { TheDogApiBreed } from '$lib/stores/breedStore'

export const getRandomBreed = (breeds: TheDogApiBreed[]) => {
    const index = Math.trunc(Math.random() * breeds.length)

    return breeds[index]
}
