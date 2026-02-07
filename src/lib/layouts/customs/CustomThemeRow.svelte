<script lang="ts">
    import { tick } from "svelte";
    import { globalState } from "../../wenyan.svelte";
    import DeleteCustomThemeButton from "./DeleteCustomThemeButton.svelte";
    import EditCustomThemeButton from "./EditCustomThemeButton.svelte";
    import { themeStore } from "../../stores/themeStore.svelte";

    let { id, name }: { id: string; name: string } = $props();
    let customThemeId = $derived(id.startsWith("0:") ? id : `custom:${id}`);

    // 重命名相关状态
    let isRenaming = $state(false);
    let editName = $state("");
    let inputRef: HTMLInputElement | undefined = $state();

    function customThemeRowClick() {
        if (isRenaming) return;
        if (globalState.getThemeEditMode() && globalState.getCurrentThemeId() !== customThemeId) {
            globalState.setConfirmMessage({
                message: "切换主题将丢失未保存的更改，是否继续？",
                action: () => {
                    themeStore.cancelNewCustomTheme();
                    globalState.setCurrentTheme(customThemeId);
                    globalState.setThemeEditMode(false);
                },
            });
        } else {
            globalState.setCurrentTheme(customThemeId);
        }
    }

    // --- 重命名逻辑 ---

    // 1. 进入重命名模式
    async function startRename(e?: Event) {
        e?.stopPropagation(); // 防止触发选中
        isRenaming = true;
        editName = name; // 重置名字
        await tick();
        inputRef?.focus();
        inputRef?.select();
    }

    // 2. 提交重命名
    function submitRename() {
        if (!isRenaming) return;

        const trimmed = editName.trim();
        if (trimmed && trimmed !== name) {
            onRename(id, trimmed);
        } else {
            editName = name; // 还原
        }
        isRenaming = false;
    }

    // 3. 取消重命名
    function cancelRename() {
        isRenaming = false;
        editName = name;
    }

    // 4. 列表项的键盘事件 (Enter 进入重命名)
    function handleRowKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();
            startRename();
        }
    }

    // 5. 输入框的键盘事件 (Enter 保存, Esc 取消)
    function handleInputKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();
            submitRename();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelRename();
        }
        e.stopPropagation(); // 防止冒泡触发其他快捷键
    }

    async function onRename(id: string, newName: string) {
        await themeStore.renameCustomTheme(id, newName);
        globalState.setCurrentTheme(`custom:${id}`); // 切换到重命名后的主题
    }
</script>

<div
    class="flex w-full items-center justify-between px-1 py-0.5 text-xs transition-colors group"
    class:bg-gray-200={globalState.getCurrentThemeId() === customThemeId}
    class:dark:bg-gray-700={globalState.getCurrentThemeId() === customThemeId}
    class:hover:bg-gray-200={globalState.getCurrentThemeId() !== customThemeId}
    class:dark:hover:bg-gray-700={globalState.getCurrentThemeId() !== customThemeId}
>
    {#if isRenaming}
        <input
            bind:this={inputRef}
            bind:value={editName}
            onkeydown={handleInputKeydown}
            onblur={submitRename}
            onclick={(e) => e.stopPropagation()}
            class="flex-1 bg-white dark:bg-gray-800 border border-blue-500 rounded px-1 py-0 outline-none text-xs min-w-0"
        />
    {:else}
        <button
            class="font-medium flex-1 text-left cursor-pointer truncate mr-2 focus:outline-none focus:underline"
            onclick={customThemeRowClick}
            ondblclick={startRename}
            onkeydown={handleRowKeydown}
            title={name}
        >
            {name}
        </button>
    {/if}

    <div
        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
        class:opacity-100={globalState.getCurrentThemeId() === customThemeId || isRenaming}
    >
        <EditCustomThemeButton id={customThemeId} />
        <DeleteCustomThemeButton id={customThemeId} />
    </div>
</div>
