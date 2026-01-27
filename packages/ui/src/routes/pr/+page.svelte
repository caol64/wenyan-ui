<script lang="ts">
    import { globalState, ThemePreview, settingsStore, localStorageSettingsAdapter } from "$lib";
    import { onMount } from "svelte";
    import markdownContent from "../../../../../assets/example.md?raw";

    settingsStore.register(localStorageSettingsAdapter);

    onMount(() => {
        globalState.setMarkdownText(markdownContent);
        globalState.setCurrentTheme("default");
        globalState.setCurrentHlTheme("github");
    });
</script>

<div class="h-screen w-full overflow-auto">
    <ThemePreview />
</div>
