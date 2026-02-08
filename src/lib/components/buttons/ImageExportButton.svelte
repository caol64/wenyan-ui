<script lang="ts">
    import Screenshot from "../icons/Screenshot.svelte";
    import { getExportImageClick } from "../../contexts/export";

    const exportImage = getExportImageClick();
</script>

<button class="overlay-button" onclick={exportImage}>
    <Screenshot />
    长图
</button>
