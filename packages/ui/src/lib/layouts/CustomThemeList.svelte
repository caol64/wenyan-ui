<script lang="ts">
    import AddCustomThemeButton from "$lib/components/buttons/AddCustomThemeButton.svelte";
    import CustomThemeButton from "../components/buttons/CustomThemeButton.svelte";
    import { themeStore } from "../wenyan.svelte";
</script>

<div class="mb-2">
    {#each Object.values(themeStore.getAllCustomThemes()) as theme}
        <CustomThemeButton id={theme.id} name={theme.name} />
    {/each}
    <div class="flex items-center justify-end w-full">
        <AddCustomThemeButton />
    </div>
</div>
