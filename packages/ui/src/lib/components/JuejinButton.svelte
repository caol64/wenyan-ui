<script lang="ts">
    import Juejin from "$lib/icons/Juejin.svelte";

    let { onClick, w = "20px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Juejin w={w} />
</button>
