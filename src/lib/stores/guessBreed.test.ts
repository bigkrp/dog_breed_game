import { describe, it, expect } from 'vitest'

import {
    getDefaultGame,
    isSubmittedBreedGuessed,
    setBreedToGuess,
    submitBreedAnswer,
    nextStage,
    getCustomGame,
    updateScore,
} from './guessBreed'
import { MAX_SCORE } from '$lib/constants'
import type { TheDogApiBreed } from '$lib/stores/breedStore'
import { getCustomGameState } from '$lib/stores/gameState'

const mockBreed: TheDogApiBreed = {
    id: 666,
    name: 'Pug',
    weight: {
        metric: '',
        imperial: '',
    },
    height: {
        metric: '',
        imperial: '',
    },
    life_span: '',
}

describe('GuessBreed test', () => {
    it('returns true when breed is guessed', () => {
        let game = getDefaultGame({
            maxAttempts: MAX_SCORE,
        })
        game = setBreedToGuess(game, mockBreed)
        game = submitBreedAnswer(game, 666)

        expect(isSubmittedBreedGuessed(game)).toBe(true)
    })
    it("returns false when breed isn't guessed", () => {
        let game = getDefaultGame({
            maxAttempts: MAX_SCORE,
        })
        game = submitBreedAnswer(setBreedToGuess(game, mockBreed), 77)

        expect(isSubmittedBreedGuessed(game)).toBe(false)
    })
    it('returns answer stage and 0 attempt when move once', () => {
        let game = getDefaultGame({
            maxAttempts: MAX_SCORE,
        })

        game = nextStage(game)

        expect(game.gameState).toStrictEqual({
            attempt: 0,
            stage: 'answer',
            maxAttempts: game.gameState.maxAttempts,
        })
    })
    it('returns question stage and 1 attempt when move once', () => {
        let game = getDefaultGame({
            maxAttempts: MAX_SCORE,
        })

        game = nextStage(nextStage(game))

        expect(game.gameState).toStrictEqual({
            attempt: 1,
            stage: 'question',
            maxAttempts: game.gameState.maxAttempts,
        })
    })
    it('2 `next` calls for add 1 attempt', () => {
        let game = getDefaultGame({
            maxAttempts: MAX_SCORE,
        })

        game = nextStage(nextStage(game))

        expect(game.gameState.attempt).toStrictEqual(1)
    })
    it('returns final stage and 5 attempt when move 11 times', () => {
        let game = getDefaultGame({
            maxAttempts: 5,
        })

        for (let i = 0; i < 11; i++) {
            game = nextStage(game)
        }

        expect({
            stage: game.gameState.stage,
            attempt: game.gameState.attempt,
        }).toStrictEqual({
            attempt: 5,
            stage: 'final',
        })
    })
    it('2 `next` calls for add 1 attempt, starts from 2', () => {
        let game = getCustomGame({
            maxAttempts: 5,
            gameState: getCustomGameState({
                maxAttempts: 5,
                attempt: 2,
                stage: 'question',
            }),
        })

        game = nextStage(nextStage(game))

        expect(game.gameState.attempt).toBe(3)
    })
    it('with maxAttempts 1 game finished after three next calls', () => {
        let game = getDefaultGame({
            maxAttempts: 1,
        })

        game = nextStage(nextStage(nextStage(game)))

        expect(game.gameState.stage).toBe('final')
    })
    it('Guess breed and update score by 1', () => {
        let game = getDefaultGame({
            maxAttempts: 1,
        })

        game = setBreedToGuess(game, mockBreed)
        game = submitBreedAnswer(game, 666)

        const isBreedGuessed = isSubmittedBreedGuessed(game)
        game = updateScore(game, game.score + 1)

        expect({ isBreedGuessed, score: game.score }).toStrictEqual({
            isBreedGuessed: true,
            score: 1,
        })
    })
})
