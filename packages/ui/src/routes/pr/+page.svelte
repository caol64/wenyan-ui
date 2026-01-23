<script lang="ts">
    import { ThemePreview } from "$lib";
    import markdownContent from "../../../../../assets/example.md?raw";

    let markdownText = $state(markdownContent);

</script>

<div class="h-screen w-full overflow-auto">
    <ThemePreview {markdownText} />
</div>
