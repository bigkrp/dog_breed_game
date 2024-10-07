<script>
	import { page } from '$app/stores';
</script>

<header>
	{$page.data.user ? $page.data.user.name : 'Need to login'}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
</style>
