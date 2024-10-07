<script lang="ts">
    import './style.pcss'
</script>

<section class="GameLayout">
    <div class="GameLayout-Main">
        <slot name="main" />
    </div>
    <div class="GameLayout-Additional">
        <slot name="additional" />
    </div>
    <footer class="GameLayout-Footer">
        <slot name="footer" class="GameLayout-Footer" />
    </footer>
</section>
