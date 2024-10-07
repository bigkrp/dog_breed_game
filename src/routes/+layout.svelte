<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="App">
	<Header />

	<main class="App-main">
		<slot />
	</main>
</div>

<style>
	.App {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.App-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: calc(var(--spacing) * 2);
		margin: auto;
	}
</style>
