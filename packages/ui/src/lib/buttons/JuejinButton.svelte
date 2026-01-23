<script lang="ts">
    import Juejin from "../icons/Juejin.svelte";

    let { onClick, w = "20px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Juejin w={w} />
</button>
