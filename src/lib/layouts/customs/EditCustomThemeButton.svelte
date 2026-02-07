<script lang="ts">
    import { globalState } from "../../wenyan.svelte";
    import Pencil from "../../components/icons/Pencil.svelte";

    let { id }: { id: string } = $props();

    function editTheme() {
        if (globalState.getCurrentThemeId() !== id) {
            globalState.setCurrentTheme(id);
        }
        globalState.setThemeEditMode(true);
    }
</script>

<button
    class="cursor-pointer p-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    class:text-gray-600={globalState.getCurrentThemeId() !== id}
    class:dark:text-gray-400={globalState.getCurrentThemeId() !== id}
    aria-label="Edit theme"
    onclick={editTheme}
    title="编辑样式"
>
    <Pencil />
</button>
