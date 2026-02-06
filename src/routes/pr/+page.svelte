<script lang="ts">
    import {
        globalState,
        ThemePreview,
        settingsStore,
        localStorageSettingsAdapter,
        articleStore,
        getExampleArticle,
    } from "../../..";
    import { onMount } from "svelte";

    settingsStore.register(localStorageSettingsAdapter);

    onMount(async () => {
        globalState.setMarkdownText(await getArticle());
        globalState.setCurrentTheme("default");
        globalState.setCurrentHlTheme("github");
    });

    async function getArticle(): Promise<string> {
        const article = articleStore.getLastArticle();
        return article ? article : await getExampleArticle();
    }
</script>

<div class="h-screen w-full overflow-auto">
    <ThemePreview />
</div>
