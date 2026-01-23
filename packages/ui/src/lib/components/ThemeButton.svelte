<script lang="ts">
    import Theme from "$lib/icons/Theme.svelte";

    let { onClick }: { onClick: () => void } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="bg-white dark:bg-gray-900 inline-flex flex-row items-center gap-2 text-center cursor-pointer text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-sm">
    <Theme />
    <span class="pointer-events-none">主题</span>
</button>
