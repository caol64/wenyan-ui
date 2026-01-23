<script lang="ts">
    import { COPY_CONTEXT_KEY, GET_WENYAN_ELEMENT_CONTEXT_KEY, MainPage, TitleBar } from "@wenyan-md/ui";
    import markdownContent from "../../../../assets/example.md?raw";
    import { setContext } from "svelte";
    import { copyHtmlToClipboard } from "$lib/utils";

    let markdownText = $state(markdownContent);
    let showSidebar = $state(false);

    function toggleSidebar() {
        showSidebar = !showSidebar;
    }

    function getWenyanElement(): HTMLElement {
        const wenyanElement = document.getElementById("wenyan");
        if (!wenyanElement) {
            throw new Error("Wenyan element not found");
        }
        const clonedWenyan = wenyanElement.cloneNode(true) as HTMLElement;
        // 清理样式以确保复制的内容干净
        [clonedWenyan, ...clonedWenyan.querySelectorAll("*")].forEach((el) => {
            el.removeAttribute("class");
            el.removeAttribute("style");
        });
        return clonedWenyan;
    }

    function handleCopy(result: string) {
        console.log("复制成功:", result);
        copyHtmlToClipboard(result);
    }

    setContext(COPY_CONTEXT_KEY, handleCopy);
    setContext(GET_WENYAN_ELEMENT_CONTEXT_KEY, getWenyanElement);
</script>

<div class="flex h-screen w-full flex-col overflow-hidden">
    <TitleBar />
    <div class="flex h-full w-full flex-col overflow-hidden md:flex-row">
        <MainPage {markdownText} />

        {#if showSidebar}
            <div class="hidden h-full w-80 flex-col border-l border-gray-300 bg-gray-50 md:flex">
                <div class="p-4">Sidebar content goes here</div>
            </div>
        {/if}
    </div>
</div>
