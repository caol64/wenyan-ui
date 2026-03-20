<script lang="ts">
    import type { FileEntry } from "../../types";
    import type { FileSystemAdapter } from "./fs";
    import FileTreeItem from "./FileTreeItem.svelte";
    import FileSidebarButton from "./FileSidebarButton.svelte";
    import { globalState } from "../../wenyan.svelte";

    let { fsAdapter }: { fsAdapter?: FileSystemAdapter } = $props();

    // 状态
    let rootPath = $state<string | null>(null);
    let files = $state<FileEntry[]>([]);
    let isRootLoading = $state(false);

    // 打开目录
    async function handleOpenDirectory() {
        if (!fsAdapter) {
            globalState.setAlertMessage({
                type: "info",
                title: "打开文件",
                message: "网页版无法打开本地文件，请使用桌面客户端。",
            });
            return;
        }
        try {
            const selected = await fsAdapter.openDirectoryPicker();

            if (selected) {
                rootPath = selected;
                await loadRootFiles(selected, fsAdapter);
            }
        } catch (error) {
            globalState.setAlertMessage({
                type: "error",
                message: `打开目录失败: ${error instanceof Error ? error.message : String(error)}`,
            });
        }
    }

    // 加载根目录
    async function loadRootFiles(path: string, fsAdapter: FileSystemAdapter) {
        isRootLoading = true;

        try {
            files = await fsAdapter.readDir(path);
        } catch (error) {
            globalState.setAlertMessage({
                type: "error",
                message: `读取目录失败: ${error instanceof Error ? error.message : String(error)}`,
            });
        } finally {
            isRootLoading = false;
        }
    }
</script>

<aside
    class="flex flex-col h-full w-64 border-r bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 select-none"
>
    <!-- 顶部操作区 -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Explorer</span>
            <FileSidebarButton />
        </div>

        <button
            class="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
            onclick={handleOpenDirectory}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                />
            </svg>
            打开目录
        </button>
    </div>

    <!-- 根目录 -->
    {#if rootPath}
        <div
            class="px-4 py-2 text-xs text-gray-500 font-mono truncate border-b border-gray-200 dark:border-gray-700"
            title={rootPath}
        >
            {rootPath}
        </div>
    {/if}

    <!-- 文件列表 -->
    <div class="flex-1 p-2 scroll-container">
        {#if isRootLoading}
            <div class="flex justify-center p-4">
                <span class="text-sm text-gray-400">加载中...</span>
            </div>
        {:else if files.length > 0}
            <div class="flex flex-col">
                {#each files as file (file.path)}
                    <FileTreeItem entry={file} {fsAdapter} />
                {/each}
            </div>
        {:else if rootPath}
            <div class="text-center p-4 text-sm text-gray-400">空文件夹</div>
        {:else}
            <div class="text-center p-8 text-sm text-gray-400">未打开任何文件夹</div>
        {/if}
    </div>
</aside>

<style>
    .scroll-container {
        scrollbar-width: auto;
        scrollbar-color: #c2c2c2 transparent;
        overflow: auto;
        overscroll-behavior: none;
    }

    @supports (background: -webkit-named-image(i)) {
        .scroll-container {
            scrollbar-width: thin;
        }
    }
</style>
