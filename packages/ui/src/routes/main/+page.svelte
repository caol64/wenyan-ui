<script lang="ts">
    import { globalState, localStorageSettingsAdapter, MainPage, settingsStore } from "$lib";
    import { onMount } from "svelte";
    import markdownContent from "../../../../../assets/example.md?raw";

    settingsStore.register(localStorageSettingsAdapter);

    onMount(() => {
        globalState.setMarkdownText(markdownContent);
        globalState.setCurrentTheme("default");
        globalState.setCurrentHlTheme("github");
    });
</script>

<div class="flex h-screen w-full flex-col overflow-hidden md:flex-row">
    <MainPage />
</div>
