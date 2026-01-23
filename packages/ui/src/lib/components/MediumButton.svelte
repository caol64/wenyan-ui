<script lang="ts">
    import Medium from "$lib/icons/Medium.svelte";

    let { onClick, w = "20px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Medium w={w} />
</button>
