import { getDefaultGameState, getNextGameState } from '$lib/stores/gameState'
import type { TheDogApiBreed } from '$lib/stores/breedStore'
import type { GameState } from '$lib/stores/gameState'

export interface GuessBreed {
    readonly gameState: GameState
    readonly score: number
    readonly breedToGuess?: TheDogApiBreed
    readonly submittedBreedId?: number
}

interface GetGameConfig {
    maxAttempts: number
}

export const getDefaultGame = (config: GetGameConfig): GuessBreed => ({
    gameState: getDefaultGameState(config.maxAttempts),
    score: 0,
})

interface GetCustomGameConfig extends GetGameConfig {
    gameState: GameState
}

export const getCustomGame = (config: GetCustomGameConfig): GuessBreed => ({
    gameState: config.gameState,
    score: 0,
})

export const updateScore = (guessBreed: GuessBreed, newScore: number): GuessBreed => ({
    ...structuredClone(guessBreed),
    score: newScore,
})
export const nextStage = (guessBreed: GuessBreed) => ({
    ...structuredClone(guessBreed),
    gameState: getNextGameState(guessBreed.gameState),
})

export const setBreedToGuess = (guessBreed: GuessBreed, breedToGuess: TheDogApiBreed) => ({
    ...structuredClone(guessBreed),
    breedToGuess: breedToGuess,
})

export const submitBreedAnswer = (guessBreed: GuessBreed, breedId: number) => ({
    ...structuredClone(guessBreed),
    submittedBreedId: breedId,
})

export const isSubmittedBreedGuessed = (guessBreed: GuessBreed): boolean => {
    return guessBreed.submittedBreedId === guessBreed.breedToGuess?.id
}
