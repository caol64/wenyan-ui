<script lang="ts">
    import { MarkdownEditor, OverlayButtons, ThemePreview, TitleBar } from "@wenyan-md/ui";
    import markdownContent from "../../../../assets/example.md?raw";

    let markdownText = $state(markdownContent);
    let showSidebar = $state(false);
    function toggleSidebar() {
        showSidebar = !showSidebar;
    }
</script>

<div class="flex h-screen w-full flex-col overflow-hidden">
    <TitleBar />
    <div class="flex h-full w-full flex-col overflow-hidden md:flex-row">
        <div class="flex h-1/2 w-full flex-col border-b border-gray-300 md:h-full md:flex-1 md:min-w-0 md:border-b-0 md:border-r">
            <div class="flex-1 overflow-auto">
                <MarkdownEditor bind:value={markdownText} />
            </div>
        </div>

        <div class="relative flex h-1/2 w-full flex-col md:h-full md:w-125 md:min-w-0">
            <OverlayButtons />

            <div class="max-w-none flex-1 overflow-auto p-8">
                <ThemePreview {markdownText} />
            </div>
        </div>

        {#if showSidebar}
            <div class="hidden h-full w-80 flex-col border-l border-gray-300 bg-gray-50 md:flex">
                <div class="p-4">Sidebar content goes here</div>
            </div>
        {/if}
    </div>
</div>
