<script lang="ts">
    import Toutiao from "../icons/Toutiao.svelte";

    let { onClick, w = "20px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Toutiao w={w} />
</button>
