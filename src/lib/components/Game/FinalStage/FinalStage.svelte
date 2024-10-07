<script lang="ts">
    import { GameLayout } from '../GameLayout'
    import { Button } from "$lib/components/Buttons/Button";

    import './style.pcss'

    export let score: number
    export let maxAttempt: number
    export let retry: () => void
</script>

<GameLayout>
    <div slot="main" class="FinalStage">
      <div class="FinalStage-Circle" />
      <div class="FinalStage-Score">
        <h1 class="FinalStage-Header">Score:</h1>
        <span class="FinalStage-Current">{score}</span>/<span class="FinalStage-Total">{maxAttempt}</span>
      </div>
    </div>
    <Button slot="footer" on:click={retry} title="Try Again ↩️️️" size="huge" />
</GameLayout>
