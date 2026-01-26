<script lang="ts">
    import WeChat from "../icons/WeChat.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    let { w = "20px" } = $props();

    async function handleClick() {
        globalState.setPlatform("wechat");
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <WeChat w={w} />
</button>
