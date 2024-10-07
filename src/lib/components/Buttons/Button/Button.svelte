<script lang="ts">
    import './style.pcss'
    type ButtonSize = 'small'|'normal'|'huge'

    export let size: ButtonSize = 'normal'
    export let title: string
    let className = '';
    export { className as class }
    export let href: string | undefined = undefined
    export let selected: boolean = false
    export let disabled: boolean = false

    $: classes = `Button Button--size-${size} ${selected ? 'Button--selected' : ''} ${disabled ? 'Button--disabled' : ''} ${className}`

    const linkOnClick = (event: Event) => {
        if (disabled) event.preventDefault()
    }
</script>

{#if href}
<a href="{href}" on:click={linkOnClick} class="{classes}">
    <span class="Button-Background"/>
    <span class="Button-Title">{title}</span>
</a>
{:else}
<button class="{classes}" disabled={disabled} on:click>
    <span class="Button-Background"/>
    <span class="Button-Title">{title}</span>
</button>
{/if}
