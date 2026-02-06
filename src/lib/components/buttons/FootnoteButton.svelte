<script lang="ts">
    import Footnote from "../icons/Footnote.svelte";
    import { wenyanRenderer, globalState } from "../../wenyan.svelte";
    import { getGetWenyanElement } from "../../contexts/copy";
    import { addFootnotes } from "@wenyan-md/core";

    let isEnabled = $state(false);
    const getWenyanElement = getGetWenyanElement();

    function toggleEnabled() {
        isEnabled = !isEnabled;
    }

    $effect(() => {
        if (isEnabled) {
            const wenyanElement = getWenyanElement();
            addFootnotes(wenyanElement);
            wenyanRenderer.html = wenyanElement.innerHTML;
        } else {
            wenyanRenderer.render(globalState.getMarkdownText());
        }
    });
</script>

<button class="overlay-button" onclick={toggleEnabled}>
    <Footnote />
    脚注
</button>
