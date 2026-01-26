<script lang="ts">
    import Toutiao from "../icons/Toutiao.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    let { w = "20px" } = $props();

    async function handleClick() {
        globalState.setPlatform("toutiao");
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Toutiao w={w} />
</button>
