<script lang="ts">
    import WeChat from "../icons/WeChat.svelte";

    let { onClick, w = "20px" }: { onClick: () => void; w?: string } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <WeChat w={w} />
</button>
