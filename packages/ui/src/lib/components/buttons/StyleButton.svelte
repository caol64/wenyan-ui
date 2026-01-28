<script lang="ts">
    import { globalState } from "$lib/wenyan.svelte";
    import Theme from "../icons/Theme.svelte";

    async function handleClick() {
        globalState.setSidebarOpen(!globalState.getSidebarOpen());
    }
</script>

<button onclick={handleClick} class="overlay-button">
    <Theme />
    样式
</button>
