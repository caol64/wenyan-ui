<script lang="ts">
    import AddCustomThemeButton from "$lib/components/buttons/AddCustomThemeButton.svelte";
    import CustomThemeRow from "$lib/layouts/CustomThemeRow.svelte";
    import { themeStore } from "$lib/store.svelte";
</script>

<div class="mb-2">
    {#each Object.values(themeStore.getAllCustomThemes()) as theme}
        <CustomThemeRow id={theme.id} name={theme.name} />
    {/each}
    <div class="flex items-center justify-end w-full">
        <AddCustomThemeButton />
    </div>
</div>
