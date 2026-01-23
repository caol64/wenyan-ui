<script lang="ts">
    import { MarkdownEditor, OverlayButtons, ThemePreview } from "../";
    import { ScrollSynchronizer } from "../scrollSync.svelte";

    let {
        markdownText = $bindable(),
        isShowOverlayButtons = $bindable(true),
    }: {
        markdownText: string;
        isShowOverlayButtons?: boolean;
    } = $props();

    const scroller = new ScrollSynchronizer();
</script>

<div
    class="flex h-1/2 w-full flex-col border-b border-gray-300 md:h-full md:flex-1 md:min-w-0 md:border-b-0 md:border-r"
>
    <div class="flex-1 overflow-hidden">
        <MarkdownEditor bind:value={markdownText} bind:scrollRef={scroller.left}  />
    </div>
</div>

<div class="relative flex h-1/2 w-full flex-col md:h-full md:flex-1 md:min-w-0">
    {#if isShowOverlayButtons}
        <OverlayButtons />
    {/if}

    <div class="max-w-none flex-1 overflow-hidden">
        <ThemePreview {markdownText} bind:scrollRef={scroller.right} />
    </div>
</div>
