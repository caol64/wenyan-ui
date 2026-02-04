<script lang="ts">
    import Clipboard from "../icons/Clipboard.svelte";
    import Check from "../icons/Check.svelte";
    import { globalState, wenyanCopier, wenyanRenderer } from "$lib/wenyan.svelte";
    import { getContext } from "svelte";
    import { COPY_CONTEXT_KEY, GET_WENYAN_ELEMENT_CONTEXT_KEY } from "$lib/contextKeys";
    import type { CopyContentType } from "$lib/constants";

    const onCopy = getContext<(result: string, contentType: CopyContentType) => void>(COPY_CONTEXT_KEY);
    const getWenyanElement = getContext<() => HTMLElement>(GET_WENYAN_ELEMENT_CONTEXT_KEY);
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
