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
        themeStore,
        indexedDbThemeStorageAdapter,
    } from "$lib";
    import ConfirmModal from "$lib/layouts/ConfirmModal.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await articleStore.register(indexedDbArticleAdapter);
        await settingsStore.register(localStorageSettingsAdapter);
        await themeStore.register(indexedDbThemeStorageAdapter);
        globalState.setMarkdownText(await getArticle());
        globalState.setPlatform("wechat");
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
<ConfirmModal />
