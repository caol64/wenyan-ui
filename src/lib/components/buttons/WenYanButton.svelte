<script lang="ts">
    import Wenyan from "../icons/WenYan.svelte";

    let { onClick, w = "28px", class: className = "" }: { onClick?: () => void; w?: string; class?: string } = $props();
</script>

<button onclick={onClick} class={className}>
    <Wenyan {w} />
</button>
