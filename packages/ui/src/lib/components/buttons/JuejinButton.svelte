<script lang="ts">
    import Juejin from "../icons/Juejin.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    let { w = "20px" } = $props();

    async function handleClick() {
        globalState.setPlatform("juejin");
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Juejin w={w} />
</button>
