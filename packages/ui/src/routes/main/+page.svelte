<script lang="ts">
    import {
        globalState,
        localStorageSettingsAdapter,
        MainPage,
        settingsStore,
        articleStore,
        indexedDbArticleAdapter,
        defaultEditorPasteHandler,
        defaultEditorDropHandler,
        AlertModal,
        setEditorPaste,
        setEditorDrop,
    } from "$lib";
    import { onMount } from "svelte";
    import markdownContent from "../../../../../assets/example.md?raw";

    setEditorPaste(defaultEditorPasteHandler);
    setEditorDrop(defaultEditorDropHandler);

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
