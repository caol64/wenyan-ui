<script lang="ts">
    import { getImportCssClick } from "../../hooks/operation";
    import { Modal } from "../../components";
    import { themeStore } from "../../stores/themeStore.svelte";
    import { globalState } from "../../wenyan.svelte";

    let { isOpen, onClose }: { isOpen: boolean; onClose?: () => void } = $props();

    const onImport = getImportCssClick();

    // 模式状态: 'create' | 'import'
    let mode = $state<"create" | "import">("create");

    let themeName = $state("自定义主题");
    let importUrl = $state("https://wenyan.yuzhi.tech/manhua.css");

    let isValid = $derived.by(() => {
        if (!themeName.trim()) return false;
        if (mode === "import" && !importUrl.trim()) return false;
        return true;
    });

    function handleSubmit() {
        if (!isValid) return;

        if (mode === "create") {
            newCustomTheme();
        } else {
            onImport?.(importUrl, themeName);
        }
        globalState.isShowCreateThemeModal = false;
        globalState.setThemeEditMode(true);
    }

    async function newCustomTheme() {
        const themeId = globalState.getCurrentThemeId();
        themeStore.addCustomTheme(`0:${themeId}`, themeName);
        globalState.setCurrentTheme(`0:${themeId}`);
        globalState.customThemeName = themeName;
    }

    async function close() {
        themeName = "自定义主题";
        importUrl = "https://wenyan.yuzhi.tech/manhua.css";
        onClose?.();
    }
</script>

<Modal {isOpen} onClose={close} width="max-w-2xl" isShowHeader={false}>
    <div class="flex flex-col gap-6">
        <div class="grid grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
                class="py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer"
                class:bg-white={mode === "create"}
                class:shadow-sm={mode === "create"}
                class:text-gray-900={mode === "create"}
                class:dark:text-gray-100={mode === "create"}
                class:dark:bg-gray-700={mode === "create"}
                class:text-gray-500={mode !== "create"}
                onclick={() => (mode = "create")}
            >
                从模版新建
            </button>
            <button
                class="py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer"
                class:bg-white={mode === "import"}
                class:shadow-sm={mode === "import"}
                class:text-gray-900={mode === "import"}
                class:dark:text-gray-100={mode === "import"}
                class:dark:bg-gray-700={mode === "import"}
                class:text-gray-500={mode !== "import"}
                onclick={() => (mode = "import")}
            >
                从 URL 导入
            </button>
        </div>

        <div class="flex flex-col gap-4">
            {#if mode === "import"}
                <div class="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label for="url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        CSS 链接地址
                    </label>
                    <input
                        type="url"
                        id="url"
                        bind:value={importUrl}
                        placeholder="https://example.com/theme.css"
                        class="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm outline-none transition-all"
                    />
                </div>
            {/if}

            <div class="space-y-1.5">
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> 主题名称 </label>
                <input
                    type="text"
                    id="name"
                    bind:value={themeName}
                    placeholder={mode === "create" ? "给主题起个名字，如：My Dark Theme" : "导入后的主题名称"}
                    class="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm outline-none transition-all"
                />
            </div>
        </div>

        <div class="flex justify-end pt-2">
            <button
                onclick={handleSubmit}
                disabled={!isValid}
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
            >
                {mode === "create" ? "立即创建" : "导入并编辑"}
            </button>
        </div>
    </div>
</Modal>
