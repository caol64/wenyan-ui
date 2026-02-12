<script lang="ts">
    import SaveCustomThemeButton from "./SaveCustomThemeButton.svelte";
    import { globalState } from "../../wenyan.svelte";
    import CancelCustomThemeButton from "./CancelCustomThemeButton.svelte";

    let isAdd = $derived(globalState.getCurrentThemeId().startsWith("0:"));
    let title = $derived(isAdd ? "正在添加新主题" : "正在编辑主题");
</script>

<div
    class="absolute w-48 top-2 right-5 flex flex-col gap-2.5 justify-start items-center py-4 bg-white dark:bg-[#1e1e1e] text-xs px-2 border border-gray-300 dark:border-gray-600 rounded-sm"
>
    <div class="text-xs">{title}</div>
    <div class="text-xs text-gray-500">
        {globalState.getCurrentTheme().name}
    </div>

    <div class="flex gap-2 pt-1">
        <CancelCustomThemeButton />
        <SaveCustomThemeButton />
    </div>
</div>
