import { writable } from "svelte/store";

import {
    getDefaultGame,
    isSubmittedBreedGuessed,
    nextStage,
    setBreedToGuess,
    submitBreedAnswer,
    updateScore
} from "$lib/stores/guessBreed";
import type { GuessBreed } from "$lib/stores/guessBreed";
import { MAX_SCORE } from "$lib/constants";
import type { TheDogApiBreed } from "$lib/stores/breedStore";

const createGameStore = () => {
    const { subscribe, update, set } = writable(getDefaultGame({ maxAttempts: MAX_SCORE }));

    const startGame = (guessBreed: GuessBreed, breedToGuess: TheDogApiBreed) => {
        return setBreedToGuess(guessBreed, breedToGuess);
    };

    const nextMove = (guessBreed: GuessBreed) => {
        return nextStage(guessBreed);
    };
    const submit = (guessBreed: GuessBreed, breedId: number) => {
        guessBreed = submitBreedAnswer(guessBreed, breedId);
        const isBreedGuessed = isSubmittedBreedGuessed(guessBreed);
        const newScore = isBreedGuessed ? guessBreed.score + 1 : guessBreed.score;

        return updateScore(guessBreed, newScore);
    };

    const setNewBreedToGuess = (guessBreed: GuessBreed, newBreedToGuess: TheDogApiBreed) => {
        return setBreedToGuess(guessBreed, newBreedToGuess);
    };

    const restartGame = () => {
        return getDefaultGame({ maxAttempts: MAX_SCORE });
    };

    return {
        subscribe,
        startGame: (breedToGuess: TheDogApiBreed) =>
            update((guessBreed) => startGame(guessBreed, breedToGuess)),
        submit: (breedId: number) => update((guessBreed) => submit(guessBreed, breedId)),
        setNewBreedToGuess: (breed: TheDogApiBreed) =>
            update((guessBreed) => setNewBreedToGuess(guessBreed, breed)),
        nextMove: () => update(nextMove),
        restartGame: () => set(restartGame())
    };
};

export const gameStore = createGameStore();
