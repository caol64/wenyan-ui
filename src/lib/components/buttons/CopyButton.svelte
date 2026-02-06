<script lang="ts">
    import Clipboard from "../icons/Clipboard.svelte";
    import Check from "../icons/Check.svelte";
    import { globalState, wenyanCopier, wenyanRenderer } from "../../wenyan.svelte";
    import { getCopyClick, getGetWenyanElement } from "../../contexts/copy";

    const onCopy = getCopyClick();
    const getWenyanElement = getGetWenyanElement();
    let copiedFlag = $state(false);

    async function handleCopy() {
        try {
            copiedFlag = true;
            if (globalState.getPlatform() === "juejin") {
                onCopy(wenyanRenderer.postHandlerContent, "txt");
            } else {
                const wenyanElement = getWenyanElement();
                await wenyanCopier.copy(wenyanElement);
                onCopy(wenyanCopier.html, "html");
            }
        } finally {
            setTimeout(() => {
                copiedFlag = false;
            }, 1000);
        }
    }
</script>

<button onclick={handleCopy} class="overlay-button">
    {#if copiedFlag}
        <Check />
    {:else}
        <Clipboard />
    {/if}
    复制
</button>
