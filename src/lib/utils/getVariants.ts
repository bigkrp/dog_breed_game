import type { TheDogApiBreed } from '$lib/stores/breedStore'
import { shuffle } from '$lib/utils/shuffle'
import { generateRandNumbers } from '$lib/utils/generateRandNumbers'

const WANTED_MINIMUM_VARIANTS = 4
const WANTED_MINIMUM_VARIANTS_WITHOUT_GUESSING = WANTED_MINIMUM_VARIANTS - 1

interface GetVariantsArguments {
    correctBreed: TheDogApiBreed
    possibleVariants: TheDogApiBreed[]
}

export const getVariants = ({
    correctBreed,
    possibleVariants,
}: GetVariantsArguments): TheDogApiBreed[] => {
    let randomNums
    try {
        randomNums = generateRandNumbers(
            Math.min(WANTED_MINIMUM_VARIANTS_WITHOUT_GUESSING, possibleVariants.length),
            possibleVariants.length,
        )
    } catch (error) {
        if (error instanceof Error) {
            console.error('getVariants error: ', error.message)
        }

        randomNums = Array.from(
            new Array(possibleVariants.slice(0, WANTED_MINIMUM_VARIANTS_WITHOUT_GUESSING).length),
        ).map((_, i) => i)
    }

    const result = shuffle([
        correctBreed,
        ...randomNums.map((number) => possibleVariants[number]),
    ]) as TheDogApiBreed[]

    return result
}
