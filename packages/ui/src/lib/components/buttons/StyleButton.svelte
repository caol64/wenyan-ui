<script lang="ts">
    import Theme from "../icons/Theme.svelte";
    import { getContext } from "svelte";
    import { STYLE_CONTEXT_KEY } from "../../keys";

    const onStyleClick = getContext<() => void>(STYLE_CONTEXT_KEY);

    async function handleClick() {
        onStyleClick();
    }
</script>

<button onclick={handleClick} class="overlay-button">
    <Theme />
    样式
</button>
