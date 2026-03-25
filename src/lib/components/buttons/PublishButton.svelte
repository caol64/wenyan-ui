<script lang="ts">
    import { getGetWenyanElement } from "../../hooks/operation";
    import { getPublishArticleClick } from "../../hooks/publish";
    import Upload from "../icons/Upload.svelte";

    const onPublish = getPublishArticleClick();
    const getWenyanElement = getGetWenyanElement();

    async function handlePublish() {
        onPublish(getWenyanElement());
    }
</script>

<button onclick={handlePublish} class="overlay-button">
    <Upload />
    发布
</button>
