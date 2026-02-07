<script lang="ts">
    import { type ThemeMeta } from "@wenyan-md/core";
    import { globalState } from "../../wenyan.svelte";
    import { themeStore } from "../../stores/themeStore.svelte";

    let { themeMeta }: { themeMeta: ThemeMeta } = $props();

    function applyTheme() {
        if (globalState.getThemeEditMode() && globalState.getCurrentThemeId() !== themeMeta.id) {
            globalState.setConfirmMessage({
                message: "切换主题将丢失未保存的更改，是否继续？",
                action: () => {
                    themeStore.cancelNewCustomTheme();
                    globalState.setCurrentTheme(themeMeta.id);
                    globalState.setThemeEditMode(false);
                },
            });
        } else {
            globalState.setCurrentTheme(themeMeta.id);
        }
    }
</script>

<button
    class="flex w-full items-center justify-between px-1 py-0.5 transition-colors cursor-pointer"
    class:bg-gray-200={globalState.getCurrentThemeId() === themeMeta.id}
    class:dark:bg-gray-700={globalState.getCurrentThemeId() === themeMeta.id}
    class:hover:bg-gray-200={globalState.getCurrentThemeId() !== themeMeta.id}
    class:dark:hover:bg-gray-700={globalState.getCurrentThemeId() !== themeMeta.id}
    onclick={applyTheme}
>
    <span class="font-medium text-sm">{themeMeta.appName}</span>
    {#if themeMeta.author}
        <span
            class="text-xs"
            class:text-gray-600={globalState.getCurrentThemeId() !== themeMeta.id}
            class:dark:text-gray-400={globalState.getCurrentThemeId() !== themeMeta.id}
        >
            {themeMeta.author}
        </span>
    {/if}
</button>
