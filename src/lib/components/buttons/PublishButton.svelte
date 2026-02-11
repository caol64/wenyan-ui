<script lang="ts">
    import { getPublishArticleClick } from "../../hooks/operation";
    import Upload from "../icons/Upload.svelte";

    const onPublish = getPublishArticleClick();

    async function handlePublish() {
        onPublish();
    }
</script>

<button onclick={handlePublish} class="overlay-button">
    <Upload />
    发布
</button>
