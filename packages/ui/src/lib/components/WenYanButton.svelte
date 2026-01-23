<script lang="ts">
    import Wenyan from "$lib/icons/WenYan.svelte";

    let { onClick, w = "32px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick}>
    <Wenyan w={w} />
</button>
