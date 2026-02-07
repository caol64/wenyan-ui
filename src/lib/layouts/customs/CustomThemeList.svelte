<script lang="ts">
    import AddCustomThemeButton from "./AddCustomThemeButton.svelte";
    import CustomThemeRow from "./CustomThemeRow.svelte";
    import { themeStore } from "../../stores/themeStore.svelte";

    let customThemes = $derived(Object.values(themeStore.getAllCustomThemes()));
</script>

<div class="mb-2">
    {#each customThemes as theme}
        <CustomThemeRow id={theme.id} name={theme.name} />
    {/each}
    {#if customThemes.length <= 6}
        <div class="flex items-center justify-end w-full">
            <AddCustomThemeButton />
        </div>
    {/if}
</div>
