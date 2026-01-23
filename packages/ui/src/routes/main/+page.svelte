<script lang="ts">
    import { MainPage } from "$lib";
    import markdownContent from "../../../../../assets/example.md?raw";

    let markdownText = $state(markdownContent);
</script>

<div class="flex h-screen w-full flex-col overflow-hidden md:flex-row">
    <MainPage {markdownText} />
</div>
