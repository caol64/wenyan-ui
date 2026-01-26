<script lang="ts">
    import RightSplitRect from "./icons/RightSplitRect.svelte";
    import { getContext } from "svelte";
    import { STYLE_CONTEXT_KEY } from "../keys";

    const onStyleClick = getContext<() => void>(STYLE_CONTEXT_KEY);

    async function handleClick() {
        onStyleClick();
    }
</script>

<button onclick={handleClick} class="cursor-pointer">
    <RightSplitRect />
</button>
