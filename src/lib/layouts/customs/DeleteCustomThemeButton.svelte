<script lang="ts">
    import { themeStore } from "../../stores/themeStore.svelte";
    import { globalState } from "../..//wenyan.svelte";
    import Trash from "../../components/icons/Trash.svelte";

    let { id }: { id: string } = $props();

    function handleDelete() {
        if (globalState.getThemeEditMode()) {
            globalState.setConfirmMessage({
                title: "删除主题",
                message: "删除主题将丢失未保存的更改，是否继续？",
                action: () => {
                    themeStore.cancelNewCustomTheme();
                    themeStore.removeCustomTheme(id.slice(7)); // id format: custom:xxx
                    if (globalState.getCurrentThemeId() === id) {
                        globalState.setCurrentTheme("default"); // 删除后切回默认主题
                    }
                    globalState.setThemeEditMode(false);
                },
            });
        } else {
            globalState.setConfirmMessage({
                title: "删除主题",
                message: "确定要删除主题吗？",
                action: () => {
                    themeStore.removeCustomTheme(id.slice(7)); // id format: custom:xxx
                    if (globalState.getCurrentThemeId() === id) {
                        globalState.setCurrentTheme("default"); // 删除后切回默认主题
                    }
                },
            });
        }
    }
</script>

<button
    class="cursor-pointer p-0.5 rounded hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
    aria-label="Delete theme"
    onclick={handleDelete}
    title="删除主题"
>
    <Trash />
</button>
