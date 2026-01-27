<script lang="ts">
    import CssEditor from "$lib/components/CssEditor.svelte";
    import { MarkdownEditor, OverlayButtons, ThemePreview } from "$lib";
    import { ScrollSynchronizer } from "$lib/scrollSync.svelte";
    import { globalState } from "$lib/wenyan.svelte";
    import EditorOverlayPanel from "./EditorOverlayPanel.svelte";

    const scroller = new ScrollSynchronizer();
</script>

<div
    class="flex h-1/2 w-full flex-col border-b border-gray-300 md:h-full md:flex-1 md:min-w-0 md:border-b-0 md:border-r"
>
    <div class="relative flex-1 overflow-hidden">
        {#if globalState.getThemeEditMode()}
            <CssEditor />
            <EditorOverlayPanel />
        {:else}
            <MarkdownEditor bind:scrollRef={scroller.left} />
        {/if}
    </div>
</div>

<div class="relative flex h-1/2 w-full flex-col md:h-full md:flex-1 md:min-w-0">
    {#if !globalState.getThemeEditMode()}
        <OverlayButtons />
    {/if}

    <div class="max-w-none flex-1 overflow-hidden">
        <ThemePreview bind:scrollRef={scroller.right} />
    </div>
</div>
