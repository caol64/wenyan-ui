<script lang="ts">
    import Theme from "../icons/Theme.svelte";

    let { onClick }: { onClick: () => void } = $props();

    async function handleClick() {

    }
</script>

<button onclick={handleClick} class="overlay-button">
    <Theme />
    主题
</button>
