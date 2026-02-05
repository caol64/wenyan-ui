<script lang="ts">
    import SaveCustomThemeButton from "$lib/components/buttons/SaveCustomThemeButton.svelte";
    import { themeStore } from "$lib/stores/themeStore.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    function cancel() {
        const currentTheme = globalState.getCurrentTheme();
        themeStore.cancelNewCustomTheme();
        globalState.setThemeEditMode(false);
        if (currentTheme.startsWith("0:")) {
            globalState.setCurrentTheme(currentTheme.slice(2));
        } else {
            globalState.setCurrentTheme(currentTheme);
        }
    }
</script>

<div
    class="absolute top-2 right-5 flex flex-col gap-2.5 justify-start items-center py-4 bg-white dark:bg-[#1e1e1e] text-xs px-2 border border-gray-300 dark:border-gray-600 rounded-sm"
>
    <div class="text-xs text-gray-500">正在编辑主题：我的主题</div>
    <div class="text-xs text-gray-500">我的主题</div>

    <div class="flex gap-2 pt-1">
        <SaveCustomThemeButton />
        <button
            class="px-3 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
            onclick={cancel}
        >
            取消
        </button>
    </div>
</div>
