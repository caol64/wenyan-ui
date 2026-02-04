<script lang="ts">
    import AddCustomThemeButton from "$lib/components/buttons/AddCustomThemeButton.svelte";
    import CustomThemeRow from "$lib/layouts/CustomThemeRow.svelte";
    import { themeStore } from "$lib/themeStore.svelte";
</script>

<div class="mb-2">
    {#each Object.values(themeStore.getAllCustomThemes()) as theme}
        <CustomThemeRow id={theme.id} name={theme.name} />
    {/each}
    {#if Object.values(themeStore.getAllCustomThemes()).length <= 6}
        <div class="flex items-center justify-end w-full">
            <AddCustomThemeButton />
        </div>
    {/if}
</div>
