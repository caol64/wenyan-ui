<script lang="ts">
    import { goto } from "$app/navigation";
    import Wenyan from "../icons/WenYan.svelte";

    let { w = "28px" }: { w?: string } = $props();

</script>

<button onclick={() => goto("/")} class="cursor-pointer">
    <Wenyan w={w} />
</button>
