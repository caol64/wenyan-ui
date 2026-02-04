<script lang="ts">
    import {
        globalState,
        localStorageSettingsAdapter,
        MainPage,
        settingsStore,
        articleStore,
        indexedDbArticleAdapter,
        EDITOR_PASTE_HANDLER_CONTEXT_KEY,
        defaultEditorPasteHandler,
        EDITOR_DROP_HANDLER_CONTEXT_KEY,
        defaultEditorDropHandler,
        AlertModal,
    } from "$lib";
    import { onMount, setContext } from "svelte";
    import markdownContent from "../../../../../assets/example.md?raw";

    setContext(EDITOR_PASTE_HANDLER_CONTEXT_KEY, defaultEditorPasteHandler);
    setContext(EDITOR_DROP_HANDLER_CONTEXT_KEY, defaultEditorDropHandler);

    onMount(async () => {
        await articleStore.register(indexedDbArticleAdapter);
        await settingsStore.register(localStorageSettingsAdapter);
        globalState.setMarkdownText(getArticle());
        globalState.setCurrentTheme("default");
        globalState.setCurrentHlTheme("github");
    });

    function getArticle(): string {
        const article = articleStore.getLastArticle();
        return article ? article : markdownContent;
    }
</script>

<div class="flex h-screen w-full flex-col overflow-hidden md:flex-row">
    <MainPage />
</div>

<AlertModal />
