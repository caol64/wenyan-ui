<script lang="ts">
    import { MarkdownEditor } from "$lib";
    import markdownContent from '../../../../../assets/example.md?raw';

    let markdownText = $state(markdownContent);

</script>

<div class="h-screen w-full overflow-auto">
    <MarkdownEditor bind:value={markdownText} />
</div>
