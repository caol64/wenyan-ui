<script lang="ts">
    import Sidebar from "./Sidebar.svelte";
    import { settingsMap } from "./settings";

    let activeSettingId = $state("wechatCredential");
    let ActiveComponent = $derived(settingsMap[activeSettingId]);
</script>

<div class="flex bg-white dark:bg-zinc-900 h-112">
    <!-- 左侧导航 -->
    <Sidebar bind:activeId={activeSettingId} />

    <!-- 右侧内容 -->
    <main class="flex-1 bg-gray-100 dark:bg-zinc-800 overflow-y-auto p-8 text-gray-700 dark:text-gray-300">
        <div class="rounded-xl shadow-sm p-6 bg-white dark:bg-zinc-900">
            <ActiveComponent />
        </div>
    </main>
</div>
