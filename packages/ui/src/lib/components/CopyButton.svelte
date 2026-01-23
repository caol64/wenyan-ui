<script lang="ts">
    import Clipboard from "$lib/icons/Clipboard.svelte";
    import { WenyanCopier } from "$lib/wenyan.svelte";

    let { onCopy }: { onCopy: (result: string) => void } = $props();

    const copier = new WenyanCopier();

    async function handleCopy() {
        const wenyanElement = document.getElementById("wenyan");
        if (!wenyanElement) {
            console.error("Wenyan element not found");
            return;
        }
        try {
            await copier.copy(wenyanElement);
            onCopy(copier.html);
        } catch (error) {
            console.error("Copy error:", error);
        }
    }
</script>

<button onclick={handleCopy} class="bg-white dark:bg-gray-900 inline-flex flex-row items-center gap-2 text-center cursor-pointer text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-sm">
    <Clipboard />
    复制
</button>
