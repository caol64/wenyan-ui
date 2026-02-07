<script lang="ts">
    import { globalState } from "../../wenyan.svelte";
    import { themeStore } from "../../stores/themeStore.svelte";

    function cancel() {
        const currentTheme = globalState.getCurrentThemeId();
        themeStore.cancelNewCustomTheme();
        globalState.setThemeEditMode(false);
        if (currentTheme.startsWith("0:")) {
            globalState.setCurrentTheme(currentTheme.slice(2));
        } else {
            globalState.setCurrentTheme(currentTheme);
        }
    }
</script>

<button
    class="px-3 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
    onclick={cancel}
>
    取消
</button>
