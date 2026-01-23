<script lang="ts">
    import CopyButton from "$lib/components/CopyButton.svelte";
    import FootnoteButton from "$lib/components/FootnoteButton.svelte";
    import ThemeButton from "$lib/components/ThemeButton.svelte";

</script>

<div
    class="absolute right-5 w-24 h-44 flex flex-col gap-2.5 justify-start items-center opacity-100 transition-opacity duration-300 py-4 rounded-md"
>
    <ThemeButton onClick={() => {
        console.log("Theme button clicked");
    }} />
    <FootnoteButton onClick={() => {
        console.log("Footnote button clicked");
    }} />
    <CopyButton onCopy={(result) => {
        console.log("Copied HTML:", result);
    }} />
</div>
