<script lang="ts">
    import Clipboard from "../icons/Clipboard.svelte";
    import Check from "../icons/Check.svelte";
    import { getCopyClick } from "../../hooks/operation";

    const onCopy = getCopyClick();
    let copiedFlag = $state(false);

    async function handleCopy() {
        try {
            copiedFlag = true;
            onCopy();
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
