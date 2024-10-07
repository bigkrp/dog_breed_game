<script lang="ts">
    import type { TheDogApiBreed } from "$lib/stores/breedStore";
    import { GameLayout } from '../GameLayout'
    import { Button } from "../../Buttons/Button";
    import type { ImagesData } from "$lib/stores/imagesStore";

    import './style.pcss'
    import { getImagePath } from "$lib/utils/getImagePath";


    export let breedToGuess: TheDogApiBreed | undefined
    export let imageData: Record<string, ImagesData>
    export let isBreedGuessed: boolean
    export let nextQuestion: () => void

    const fallback = '/pug.jpg'

    const path = getImagePath(imageData, breedToGuess)
    const  handleError = (event: Event) => {
        const img = event.target as HTMLImageElement
        img.src = fallback
        img.alt = 'Fallback Pug'
    }
</script>

<GameLayout>
    <h1 slot="additional">
        {#if isBreedGuessed}
            You guess!
        {:else}
            Not this time!
        {/if}
    </h1>
    <figure slot="main" class="AnswerStage-DogBreedAnswer">
        <img src={path} alt="{breedToGuess?.name}" on:error={handleError} class="AnswerStage-DogBreedAnswerImage">
        <figcaption class="AnswerStage-DogBreedAnswerCaption">
            {breedToGuess?.name}
        </figcaption>
    </figure>
    <Button slot="footer" title="Next ➡️️" size="huge" on:click={nextQuestion} />
</GameLayout>

