<script lang="ts">
    import {
        COPY_CONTEXT_KEY,
        GET_WENYAN_ELEMENT_CONTEXT_KEY,
        MainPage,
        Sidebar,
        TitleBar,
        globalState,
        themeStore,
        settingsStore,
        localStorageSettingsAdapter,
        type CopyContentType,
        indexedDbThemeStorageAdapter,
        copyHtmlToClipboard,
        copyTextToClipboard,
        articleStore,
        indexedDbArticleAdapter,
    } from "@wenyan-md/ui";
    import markdownContent from "../../../../assets/example.md?raw";
    import { onMount, setContext } from "svelte";

    function getWenyanElement(): HTMLElement {
        const wenyanElement = document.getElementById("wenyan");
        if (!wenyanElement) {
            throw new Error("Wenyan element not found");
        }
        const clonedWenyan = wenyanElement.cloneNode(true) as HTMLElement;
        // 清理样式以确保复制的内容干净
        // [clonedWenyan, ...clonedWenyan.querySelectorAll("*")].forEach((el) => {
        //     el.removeAttribute("class");
        //     el.removeAttribute("style");
        // });
        return clonedWenyan;
    }

    function handleCopy(result: string, contentType: CopyContentType) {
        if (contentType === "html") {
            copyHtmlToClipboard(result);
        } else {
            copyTextToClipboard(result);
        }
    }

    setContext(COPY_CONTEXT_KEY, handleCopy);
    setContext(GET_WENYAN_ELEMENT_CONTEXT_KEY, getWenyanElement);

    onMount(async () => {
        await themeStore.register(indexedDbThemeStorageAdapter);
        await settingsStore.register(localStorageSettingsAdapter);
        await articleStore.register(indexedDbArticleAdapter);
        globalState.setMarkdownText(getArticle());
        globalState.setPlatform("wechat");
    });

    function getArticle(): string {
        const article = articleStore.getLastArticle();
        return article ? article : markdownContent;
    }
</script>

<div class="flex h-screen w-full flex-col overflow-hidden">
    <TitleBar />
    <div class="flex h-full w-full flex-col overflow-hidden md:flex-row">
        <MainPage />

        {#if globalState.judgeSidebarOpen()}
            <div class="h-full w-80">
                <Sidebar />
            </div>
        {/if}
    </div>
</div>
