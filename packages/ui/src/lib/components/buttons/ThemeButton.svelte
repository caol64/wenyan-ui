<script lang="ts">
    import { type ThemeMeta } from "@wenyan-md/core";
    import { globalState } from "$lib/wenyan.svelte";

    let { themeMeta }: { themeMeta: ThemeMeta } = $props();
</script>

<button
    class="flex w-full items-center justify-between px-2 py-1.5 text-sm transition-colors"
    class:bg-blue-600={globalState.getCurrentTheme() === themeMeta.id}
    class:text-white={globalState.getCurrentTheme() === themeMeta.id}
    class:hover:bg-gray-200={globalState.getCurrentTheme() !== themeMeta.id}
    onclick={() => globalState.setCurrentTheme(themeMeta.id)}
>
    <span class="font-medium">{themeMeta.name}</span>
    {#if themeMeta.author}
        <span
            class="text-xs"
            class:text-blue-100={globalState.getCurrentTheme() === themeMeta.id}
            class:text-gray-500={globalState.getCurrentTheme() !== themeMeta.id}
        >
            {themeMeta.author}
        </span>
    {/if}
</button>
