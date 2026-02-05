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
        getExampleArticle,
    } from "$lib";
    import { onMount } from "svelte";

    setEditorPaste(defaultEditorPasteHandler);
    setEditorDrop(defaultEditorDropHandler);

    onMount(async () => {
        await articleStore.register(indexedDbArticleAdapter);
        await settingsStore.register(localStorageSettingsAdapter);
        globalState.setMarkdownText(await getArticle());
        globalState.setCurrentTheme("default");
        globalState.setCurrentHlTheme("github");
    });

    async function getArticle(): Promise<string> {
        const article = articleStore.getLastArticle();
        return article ? article : await getExampleArticle();
    }
</script>

<div class="flex h-screen w-full flex-col overflow-hidden md:flex-row">
    <MainPage />
</div>

<AlertModal />
