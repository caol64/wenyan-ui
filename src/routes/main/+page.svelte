<script lang="ts">
    import {
        globalState,
        localStorageSettingsAdapter,
        MainPage,
        settingsStore,
        articleStore,
        indexedDbArticleAdapter,
        AlertModal,
        getExampleArticle,
        Sidebar,
        TitleBar,
    } from "$lib";
    import { onMount } from "svelte";

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

<AlertModal />
