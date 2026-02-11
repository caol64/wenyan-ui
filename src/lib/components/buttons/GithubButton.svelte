<script lang="ts">
    import Github from "../icons/Github.svelte";

    let { onClick }: { onClick: () => void } = $props();
</script>

<button onclick={onClick} class="cursor-pointer" aria-label="Go to github">
    <Github />
</button>
