<script lang="ts">
    import { globalState } from "../../wenyan.svelte";
    import Pencil from "../../components/icons/Pencil.svelte";
    import { themeStore } from "../../stores/themeStore.svelte";

    let { id }: { id: string } = $props();

    function editTheme() {
        if (globalState.getThemeEditMode()) {
            globalState.setConfirmMessage({
                message: "编辑主题将丢失未保存的更改，是否继续？",
                action: () => {
                    themeStore.cancelNewCustomTheme();
                    globalState.setCurrentTheme(id);
                },
            });
        } else {
            if (globalState.getCurrentThemeId() !== id) {
                globalState.setCurrentTheme(id);
            }
            globalState.setThemeEditMode(true);
        }
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
