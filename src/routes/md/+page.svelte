<script lang="ts">
    import { MarkdownEditor, articleStore, getExampleArticle, globalState } from "../../..";
    import { onMount } from "svelte";

    onMount(async () => {
        globalState.setMarkdownText(await getArticle());
    });

    async function getArticle(): Promise<string> {
        const article = articleStore.getLastArticle();
        return article ? article : await getExampleArticle();
    }
</script>

<div class="h-screen w-full overflow-auto">
    <MarkdownEditor />
</div>
