<script lang="ts">
    import ThemeButton from "$lib/components/buttons/ThemeButton.svelte";
    import { getAllGzhThemes } from "@wenyan-md/core";

</script>

<div class="mb-2 space-y-0.5">
    {#each getAllGzhThemes() as theme}
        <ThemeButton themeMeta={theme.meta} />
    {/each}
</div>
