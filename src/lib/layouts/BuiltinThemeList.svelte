<script lang="ts">
    import BuiltinThemeRow from "./BuiltinThemeRow.svelte";
    import { getAllGzhThemes } from "@wenyan-md/core";

</script>

<div class="mb-2">
    {#each getAllGzhThemes() as theme}
        <BuiltinThemeRow themeMeta={theme.meta} />
    {/each}
</div>
