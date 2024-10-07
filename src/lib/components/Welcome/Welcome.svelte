<script lang="ts">
    import { Button } from "../Buttons/Button";
    import './style.pcss'
</script>

<section class="Welcome">
    <div class="Welcome-Title">
        <h1 class="Welcome-TitleHeader">Welcome to the dog breed guess game</h1>
    </div>
    <picture class="Welcome-Picture">
        <img src="/images/dog_face.svg" alt="dog face svg" />
    </picture>
    <div class="Welcome-StartGame">
        <Button size="huge" href="/game" title="Start Game" />
    </div>
</section>
