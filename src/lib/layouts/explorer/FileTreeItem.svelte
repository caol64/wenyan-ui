<script lang="ts">
    import type { FileEntry } from "../../types";
    import type { FileSystemAdapter } from "./fs";
    import Self from "./FileTreeItem.svelte";
    import { getHandleFileOpen } from "../../hooks/operation";
    import { globalState } from "../../wenyan.svelte";

    let {
        entry,
        depth = 0,
        fsAdapter,
    }: {
        entry: FileEntry;
        depth?: number;
        fsAdapter?: FileSystemAdapter;
    } = $props();

    let isOpen = $state(false);
    let children = $state<FileEntry[]>([]);
    let isLoading = $state(false);

    const handleFileSelect = getHandleFileOpen();

    async function toggleOpen() {
        if (!entry.isDirectory) {
            handleFileSelect(entry.path);
            return;
        }

        isOpen = !isOpen;

        if (isOpen && children.length === 0) {
            isLoading = true;
            try {
                if (fsAdapter) {
                    children = await fsAdapter.readDir(entry.path);
                }
            } catch (error) {
                globalState.setAlertMessage({
                    type: "error",
                    message: `打开文件失败: ${error instanceof Error ? error.message : String(error)}`,
                });
            } finally {
                isLoading = false;
            }
        }
    }
</script>

<div>
    <button
        class="cursor-pointer flex w-full items-center gap-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded text-sm text-left transition-colors truncate"
        style="padding-left: {depth * 12 + 8}px"
        onclick={toggleOpen}
    >
        <!-- 图标区 -->
        <span class="text-gray-500 shrink-0">
            {#if isLoading}
                <!-- Loading Spinner -->
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            {:else if entry.isDirectory}
                <!-- Folder Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 {isOpen ? 'text-blue-500' : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                </svg>
            {:else}
                <!-- File Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            {/if}
        </span>

        <span class="truncate text-gray-700 dark:text-gray-300 select-none">
            {entry.name}
        </span>
    </button>

    <!-- 递归渲染子节点 -->
    {#if isOpen && entry.isDirectory}
        <div class="flex flex-col">
            {#each children as child (child.path)}
                <Self entry={child} depth={depth + 1} {fsAdapter} />
            {/each}
        </div>
    {/if}
</div>
