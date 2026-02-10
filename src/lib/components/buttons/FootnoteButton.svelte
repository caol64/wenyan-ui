<script lang="ts">
    import Footnote from "../icons/Footnote.svelte";
    import { getFootnoteClick } from "../../contexts/operation";

    let isEnabled = $state(false);
    const footnoteClick = getFootnoteClick();

    function toggleEnabled() {
        isEnabled = !isEnabled;
    }

    $effect(() => {
        footnoteClick(isEnabled);
    });
</script>

<button class="overlay-button" onclick={toggleEnabled}>
    <Footnote />
    脚注
</button>
