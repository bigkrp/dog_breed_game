<script lang="ts">
    import { gameStore } from "$lib/stores/gameStore";
    import { usedBreedStore } from "$lib/stores/usedBreedStore";

    import type { PageData } from "./$types";
    import { getRandomBreed, getVariants } from "$lib/utils";
    import { onMount } from "svelte";
    import { derived } from "svelte/store";
    import { isSubmittedBreedGuessed } from "$lib/stores/guessBreed.js";
    import ResolveStage from "$lib/components/Game/ResolveStage.svelte";

    export let data: PageData;

    onMount(() => {
        const startedBreed = getRandomBreed(data.breeds);
        usedBreedStore.update((usedBreed) => new Set(usedBreed.add(startedBreed.id)));
        gameStore.startGame(startedBreed);
    });
    const submit = (breedId: number) => {
        usedBreedStore.update((usedBreeds) => new Set(usedBreeds.add(breedId)));
        gameStore.submit(breedId);
        gameStore.nextMove();
    };

    const nextQuestion = () => {
        gameStore.setNewBreedToGuess(getRandomBreed(data.breeds.filter(({ id }: {
            id: number
        }) => !$usedBreedStore.has(id))));
        gameStore.nextMove();
    };

    const retry = () => {
        gameStore.restartGame();
        const startedBreed = getRandomBreed(data.breeds);
        usedBreedStore.update((usedBreed) => new Set(usedBreed.add(startedBreed.id)));
        gameStore.startGame(startedBreed);
    };

    $: {
        console.debug("$gameStore", $gameStore);
    }

    const variants = derived(gameStore, ($gameStore) => {
        return $gameStore?.breedToGuess !== undefined ? getVariants({
            correctBreed: $gameStore?.breedToGuess,
            possibleVariants: data.breeds.filter(({ id }: { id: number }) => !$usedBreedStore.has(id))
        }) : [];
    });
</script>

<ResolveStage
  stage={$gameStore.gameState.stage}
  breedToGuess={$gameStore.breedToGuess}
  variants={$variants}
  submit={submit}
  imageData={data.imageData}
  isBreedGuessed={isSubmittedBreedGuessed($gameStore)}
  nextQuestion={nextQuestion}
  score={$gameStore.score}
  maxAttempt={$gameStore.gameState.maxAttempts}
  retry={retry}
/>
