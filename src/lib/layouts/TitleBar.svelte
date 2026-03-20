<script lang="ts">
    import { goto } from "$app/navigation";
    import { FileSidebarButton } from ".";
    import WenYanButton from "../components/buttons/WenYanButton.svelte";
    import PlatformButtons from "./PlatformButtons.svelte";
</script>

<div class="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-900">
    <div class="flex flex-row gap-2 justify-center">
        <WenYanButton onClick={() => goto("/")} class="cursor-pointer" />
        <span class="text-lg font-bold ml-2">文颜</span>
        <FileSidebarButton />
    </div>

    <PlatformButtons w="24px" />
</div>
