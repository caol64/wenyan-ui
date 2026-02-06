<script lang="ts">
    import ToggleSwitcher from "../../components/ToggleSwitcher.svelte";
    import { settingsStore } from "../../stores/settingsStore.svelte";

    let isWechatChecked = $derived(settingsStore.enabledImageHost === "wechat");

    function toggleImageHost(host: string, enabled: boolean) {
        settingsStore.enabledImageHost = enabled ? host : "";
        settingsStore.saveSettings();
    }
</script>

<div class="flex flex-col gap-6">
    <header class="flex items-center border-b border-gray-100 dark:border-gray-700 pb-4">
        <div>
            <h2 class="text-xl font-bold">图床设置</h2>
            <p class="text-sm text-gray-500 mt-1">配置启用的图床服务</p>
        </div>
    </header>

    <div class="flex items-center justify-between">
        <div class="text-sm font-medium">公众号图床</div>
        <ToggleSwitcher isChecked={isWechatChecked} onChange={(v) => toggleImageHost("wechat", v)} />
    </div>
</div>
