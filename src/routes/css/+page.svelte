<script lang="ts">
    import { CssEditor, globalState } from "$lib";
    import { getTheme } from "@wenyan-md/core";
    import { onMount } from "svelte";

    onMount(async () => {
        const theme = getTheme("default");
        const cssContent = (await theme?.getCss()) || "";
        globalState.setCurrentThemeCss(cssContent);
    });
</script>

<div class="h-screen w-full overflow-auto">
    <CssEditor />
</div>
