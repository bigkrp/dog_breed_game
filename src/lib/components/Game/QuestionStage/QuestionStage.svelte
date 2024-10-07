<script lang="ts">
    import { GameLayout } from '../GameLayout'
    import { ButtonGroup } from "../../Buttons/ButtonGroup";
    import { Button } from "../../Buttons/Button";
    import type { TheDogApiBreed } from "$lib/stores/breedStore";

    import './style.pcss'

    export let breedToGuess: TheDogApiBreed | undefined
    export let variants: TheDogApiBreed[]
    export let submit: (breedId: number) => void

    let selected: number | null = null
    const onSelectHandler = (id: number) => selected = id
    const onSubmitHandler =() => {
        if (selected===null) {
            return
        }

        submit(selected)
    }
</script>

<GameLayout>
    <article slot="main" class="QuestionStage-DogBreedDescriptionText">
        <h1>Description</h1>
        {#if breedToGuess !== undefined}

        <dl class="QuestionStage-DogBreedDescriptionList">
            <div class="QuestionStage-DogBreedDescriptionList-Col">
                <dt>Group</dt>
                <dd>{breedToGuess?.breed_group}</dd>

                <dt>Temperament</dt>
                <dd>{breedToGuess?.temperament}</dd>

                <dt>Life Span</dt>
                <dd>{breedToGuess?.life_span}</dd>
            </div>
            <div class="QuestionStage-DogBreedDescriptionList-Col">
                <dt>Breed for</dt>
                <dd>{breedToGuess?.bred_for}</dd>

                <dt>Height</dt>
                <dd>{breedToGuess?.height?.metric}</dd>

                <dt>Weight</dt>
                <dd>{breedToGuess?.weight?.metric}</dd>
            </div>
        </dl>
        <!--{#if breedToGuess !== undefined}-->
        <!--    Description: {breedToGuess}-->
        {:else }
            There is no description, try to guess
        {/if}
    </article>
    <ButtonGroup slot="additional" cols={2}>
        {#each variants as variant}
            <Button title={variant.name}
                    selected={selected === variant.id}
                    on:click={() => onSelectHandler(variant.id)} />
        {/each}
    </ButtonGroup>
    <Button slot="footer" disabled={selected === null} title="Submit" size="huge" on:click={onSubmitHandler} />
</GameLayout>
