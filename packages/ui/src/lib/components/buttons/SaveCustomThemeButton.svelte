<script lang="ts">
    import { globalState } from "$lib/wenyan.svelte";
    import { themeStore } from "$lib/store.svelte";

    function save() {
        if (globalState.getCurrentTheme().startsWith("0:")) {
            themeStore.saveNewCustomTheme(globalState.getCurrentThemeCss());
        } else {
            const themeId = globalState.getCurrentTheme();
            if (themeId.startsWith("custom:")) {
                const oldTheme = themeStore.getCustomTheme(themeId.slice(7));
                if (!oldTheme) return;
                themeStore.saveCustomTheme(oldTheme.id, oldTheme.name, globalState.getCurrentThemeCss());
            }
        }
        globalState.setThemeEditMode(false);
    }
</script>

<button
    class="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
    onclick={save}
>
    保存
</button>
