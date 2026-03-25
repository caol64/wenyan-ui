<script lang="ts">
    import { getUploadImage } from "../../hooks/upload";
    import { getGetWenyanElement } from "../../hooks/operation";
    import { getPublishArticleClick, getPublishArticleToDraft, getPublishHelpClick } from "../../hooks/publish";
    import Upload from "../icons/Upload.svelte";

    const onPublish = getPublishArticleClick();
    const getWenyanElement = getGetWenyanElement();
    const handlePublishHelpClick = getPublishHelpClick();
    const handleUploadImage = getUploadImage();
    const handlePublishArticleToDraft = getPublishArticleToDraft();

    async function handlePublish() {
        onPublish(getWenyanElement(), handlePublishHelpClick, handleUploadImage, handlePublishArticleToDraft);
    }
</script>

<button onclick={handlePublish} class="overlay-button">
    <Upload />
    发布
</button>
