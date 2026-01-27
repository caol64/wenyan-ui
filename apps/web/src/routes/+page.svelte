<script lang="ts">
    import {
        COPY_CONTEXT_KEY,
        GET_WENYAN_ELEMENT_CONTEXT_KEY,
        STYLE_CONTEXT_KEY,
        MainPage,
        Sidebar,
        TitleBar,
        globalState,
        themeStore,
        settingsStore,
        localStorageSettingsAdapter,
    } from "@wenyan-md/ui";
    import markdownContent from "../../../../assets/example.md?raw";
    import { onMount, setContext } from "svelte";
    import { copyHtmlToClipboard } from "$lib/utils";
    import { indexedDbAdapter } from "$lib/store";

    themeStore.register(indexedDbAdapter);
    settingsStore.register(localStorageSettingsAdapter);

    let codeblockSettings = $derived(settingsStore.getSettings().codeblockSettings || {});

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
        copyHtmlToClipboard(result);
    }

    function handleStyleClick() {
        globalState.setSidebarOpen(!globalState.getSidebarOpen());
    }

    setContext(COPY_CONTEXT_KEY, handleCopy);
    setContext(GET_WENYAN_ELEMENT_CONTEXT_KEY, getWenyanElement);
    setContext(STYLE_CONTEXT_KEY, handleStyleClick);

    onMount(() => {
        console.log("App mounted", codeblockSettings.hlThemeId);
        globalState.setMarkdownText(markdownContent);
        globalState.setThemeEditMode(false);
        globalState.setSidebarOpen(false);
        globalState.setCurrentTheme(settingsStore.getSettings().wechatTheme || "default");
        globalState.setCurrentHlTheme(codeblockSettings.hlThemeId || "github");
    });
</script>

<div class="flex h-screen w-full flex-col overflow-hidden">
    <TitleBar />
    <div class="flex h-full w-full flex-col overflow-hidden md:flex-row">
        <MainPage />

        {#if globalState.getSidebarOpen()}
            <div class="h-full w-80">
                <Sidebar />
            </div>
        {/if}
    </div>
</div>
