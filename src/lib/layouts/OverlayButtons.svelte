<script lang="ts">
    import CopyButton from "$lib/components/buttons/CopyButton.svelte";
    import FootnoteButton from "$lib/components/buttons/FootnoteButton.svelte";
    import StyleButton from "$lib/components/buttons/StyleButton.svelte";
    import { globalState } from "$lib/wenyan.svelte";
</script>

<div
    class="absolute right-5 flex flex-col gap-2.5 justify-start items-center opacity-100 transition-opacity duration-300 py-4 rounded-md"
>
    {#if globalState.getPlatform() === "wechat"}
        <StyleButton />
    {/if}
    <FootnoteButton />
    <CopyButton />
</div>
