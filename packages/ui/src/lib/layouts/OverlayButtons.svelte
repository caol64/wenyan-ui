<script lang="ts">
    import CopyButton from "../components/buttons/CopyButton.svelte";
    import FootnoteButton from "../components/buttons/FootnoteButton.svelte";
    import StyleButton from "../components/buttons/StyleButton.svelte";
    import { globalState } from "../wenyan.svelte";
</script>

{#if globalState.getThemeEditMode()}
    <div
        class="absolute top-2 right-5 flex flex-col gap-2.5 justify-start items-center py-4 bg-white dark:bg-[#1e1e1e] text-xs px-2 border border-gray-300 dark:border-gray-600 rounded-sm"
    >
        <div class="text-xs text-gray-500">正在编辑主题：我的主题</div>
        <div class="text-xs text-gray-500">我的主题</div>

        <div class="flex gap-2 pt-1">
            <button
                class="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">保存</button
            >
            <button class="px-3 py-1 text-xs rounded text-red-600 border border-red-200 hover:bg-red-50">删除</button>
        </div>
    </div>
{:else}
    <div
        class="absolute right-5 flex flex-col gap-2.5 justify-start items-center opacity-100 transition-opacity duration-300 py-4 rounded-md"
    >
        <StyleButton />
        <FootnoteButton />
        <CopyButton />
    </div>
{/if}
