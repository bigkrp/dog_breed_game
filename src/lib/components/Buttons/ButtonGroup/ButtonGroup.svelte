<script lang="ts">
    import './style.pcss'
    export let cols: number = 2

</script>

<div class="ButtonGroup" style="--cols: {cols}">
    <slot/>
</div>

<style lang="postcss">
    .ButtonGroup {
        grid-template-columns: repeat(var(--cols), max-content);
    }
</style>
