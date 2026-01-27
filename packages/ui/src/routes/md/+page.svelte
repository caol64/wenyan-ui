<script lang="ts">
    import { MarkdownEditor, globalState } from "$lib";
    import markdownContent from '../../../../../assets/example.md?raw';

    globalState.setMarkdownText(markdownContent);

</script>

<div class="h-screen w-full overflow-auto">
    <MarkdownEditor />
</div>
