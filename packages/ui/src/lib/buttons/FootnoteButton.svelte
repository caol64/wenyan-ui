<script lang="ts">
    import Footnote from "../icons/Footnote.svelte";

    let { onClick }: { onClick: () => void } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="overlay-button">
    <Footnote />
    脚注
</button>
