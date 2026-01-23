<script lang="ts">
    import WenYanButton from "$lib/components/WenYanButton.svelte";
    import PlatformButtons from "./PlatformButtons.svelte";
</script>

<div class="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800">
    <div class="flex flex-row gap-2 justify-center">
        <WenYanButton
            onClick={() => {
                console.log("WenYan button clicked");
            }}
        />
        <span class="text-2xl font-bold">文颜</span>
    </div>

    <PlatformButtons w="24px" />
</div>
