<script lang="ts">
    import Clipboard from "../icons/Clipboard.svelte";
    import Check from "../icons/Check.svelte";
    import { wenyanCopier } from "../../wenyan.svelte";
    import { getContext } from "svelte";
    import { COPY_CONTEXT_KEY, GET_WENYAN_ELEMENT_CONTEXT_KEY } from "../../keys";

    const onCopy = getContext<(result: string) => void>(COPY_CONTEXT_KEY);
    const getWenyanElement = getContext<() => HTMLElement>(GET_WENYAN_ELEMENT_CONTEXT_KEY);
    let copiedFlag = $state(false);

    async function handleCopy() {
        try {
            copiedFlag = true;
            const wenyanElement = getWenyanElement();
            await wenyanCopier.copy(wenyanElement);
            onCopy(wenyanCopier.html);
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
