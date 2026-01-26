<script lang="ts">
    import Wenyan from "../icons/WenYan.svelte";

    let { w = "28px" }: { w?: string } = $props();

</script>

<button>
    <Wenyan w={w} />
</button>
