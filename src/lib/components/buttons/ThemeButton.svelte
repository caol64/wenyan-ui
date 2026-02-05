<script lang="ts">
    import { type ThemeMeta } from "@wenyan-md/core";
    import { globalState } from "$lib/wenyan.svelte";

    let { themeMeta }: { themeMeta: ThemeMeta } = $props();

    function applyTheme() {
        if (globalState.getCurrentTheme() !== themeMeta.id) {
            // alert not saved changes
            // clear unsaved changes state
            // reset 
        }
        globalState.setCurrentTheme(themeMeta.id);
    }
</script>

<button
    class="flex w-full items-center justify-between px-1 py-0.5 transition-colors cursor-pointer"
    class:bg-gray-200={globalState.getCurrentTheme() === themeMeta.id}
    class:dark:bg-gray-700={globalState.getCurrentTheme() === themeMeta.id}
    class:hover:bg-gray-200={globalState.getCurrentTheme() !== themeMeta.id}
    class:dark:hover:bg-gray-700={globalState.getCurrentTheme() !== themeMeta.id}
    onclick={applyTheme}
>
    <span class="font-medium text-sm">{themeMeta.appName}</span>
    {#if themeMeta.author}
        <span
            class="text-xs"
            class:text-gray-600={globalState.getCurrentTheme() !== themeMeta.id}
            class:dark:text-gray-400={globalState.getCurrentTheme() !== themeMeta.id}
        >
            {themeMeta.author}
        </span>
    {/if}
</button>
