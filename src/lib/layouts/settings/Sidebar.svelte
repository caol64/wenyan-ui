<script lang="ts">
    import Gear from "$lib/components/icons/Gear.svelte";
    import { credentialMenuItems } from "./settings";

    let { activeId = $bindable() }: { activeId: string } = $props();
    let isCredentialExpanded = $state(true);

    function selectItem(id: string) {
        activeId = id;
    }
</script>

<div class="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto flex flex-col py-4">
    <div class="px-4 mb-6">
        <h1 class="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span><Gear /></span>
            <span>设置</span>
        </h1>
    </div>

    <nav class="space-y-1 px-2">
        <!-- 组：凭据管理 -->
        <div>
            <button
                class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md transition-colors cursor-pointer"
                onclick={() => (isCredentialExpanded = !isCredentialExpanded)}
            >
                <div class="flex items-center gap-2">
                    <!-- 箭头图标 -->
                    <svg
                        class="w-4 h-4 transition-transform duration-200 {isCredentialExpanded ? 'rotate-90' : ''}"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    凭据管理
                </div>
            </button>

            {#if isCredentialExpanded}
                <div class="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-2">
                    {#each credentialMenuItems as item}
                        <button
                            class="w-full text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer text-gray-700 dark:text-gray-300 {activeId ===
                            item.id
                                ? 'bg-gray-100 dark:bg-zinc-800 font-medium'
                                : 'hover:bg-gray-100 dark:hover:bg-zinc-800'}"
                            onclick={() => selectItem(item.id)}
                        >
                            {item.label}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- 独立项：图床设置 -->
        <button
            class="w-full text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer flex items-center gap-2 text-gray-700 dark:text-gray-300 {activeId ===
            'imageHost'
                ? 'bg-gray-100 dark:bg-zinc-800 font-medium'
                : 'hover:bg-gray-100 dark:hover:bg-zinc-800'}"
            onclick={() => selectItem("imageHost")}
        >
            <span class="h-4"></span> 图床设置
        </button>

    </nav>
</div>
