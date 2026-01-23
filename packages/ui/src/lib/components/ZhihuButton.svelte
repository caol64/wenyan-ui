<script lang="ts">
    import Zhihu from "$lib/icons/Zhihu.svelte";

    let { onClick, w = "20px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Zhihu w={w} />
</button>
