<script lang="ts">
    import { globalState } from "../wenyan.svelte";

    let { id, name }: { id: string; name: string } = $props();
    let customThemeId = $derived(id.startsWith("0:") ? id : `custom:${id}`);

    function customThemeRowClick() {
        if (globalState.getCurrentTheme() !== customThemeId) {
            // alert not saved changes
        }
        globalState.setCurrentTheme(customThemeId);
    }

    function editTheme() {
        if (globalState.getCurrentTheme() !== customThemeId) {
            globalState.setCurrentTheme(customThemeId);
        }
        globalState.setThemeEditMode(true);
    }
</script>

<div
    class="flex w-full items-center justify-between px-1 py-0.5 text-xs transition-colors"
    class:bg-gray-200={globalState.getCurrentTheme() === customThemeId}
    class:dark:bg-gray-700={globalState.getCurrentTheme() === customThemeId}
    class:hover:bg-gray-200={globalState.getCurrentTheme() !== customThemeId}
    class:dark:hover:bg-gray-700={globalState.getCurrentTheme() !== customThemeId}
>
    <button
        class="font-medium flex-1 text-left cursor-pointer"
        onclick={customThemeRowClick}>
        {name}
    </button>
    <button
        class="cursor-pointer"
        class:text-gray-600={globalState.getCurrentTheme() !== customThemeId}
        class:dark:text-gray-400={globalState.getCurrentTheme() !== customThemeId}
        aria-label="Edit theme"
        onclick={editTheme}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
    </button>
</div>
