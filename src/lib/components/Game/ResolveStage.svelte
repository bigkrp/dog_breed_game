<script lang="ts">
    import { FinalStage } from "./FinalStage";
    import { AnswerStage } from "./AnswerStage";

    import type { GameStage } from "$lib/stores/gameState";
    import type { TheDogApiBreed } from "$lib/stores/breedStore";
    import type { ImagesData } from "$lib/stores/imagesStore";
    import { QuestionStage } from "$lib/components/Game/QuestionStage";

    export let stage: GameStage;
    export let score: number;
    export let maxAttempt: number;
    export let retry: () => void;
    export let breedToGuess: TheDogApiBreed | undefined;
    export let imageData: Record<string, ImagesData>;
    export let isBreedGuessed: boolean;
    export let variants: TheDogApiBreed[];
    export let submit: (breedId: number) => void;
    export let nextQuestion: () => void;
</script>

{#if (stage === 'final')}
  <FinalStage {score} {maxAttempt} {retry} />
{:else if (stage === 'answer')}
  <AnswerStage
    breedToGuess={breedToGuess}
    imageData={imageData}
    isBreedGuessed={isBreedGuessed}
    nextQuestion={nextQuestion}
  />
{:else if (stage === 'question')}
  <QuestionStage
    breedToGuess={breedToGuess}
    variants={variants}
    submit={submit}
  />
{:else}
  <QuestionStage
    breedToGuess={breedToGuess}
    variants={variants}
    submit={submit}
  />
{/if}
