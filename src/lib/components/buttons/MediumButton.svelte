<script lang="ts">
    import Medium from "../icons/Medium.svelte";
    import { globalState } from "../../wenyan.svelte";

    let { w = "20px" } = $props();

    async function handleClick() {
        globalState.setPlatform("medium");
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <Medium w={w} />
</button>
