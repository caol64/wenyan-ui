<script lang="ts">
    import ToggleSwitcher from "../../components/ToggleSwitcher.svelte";
    import { settingsStore } from "../../stores/settingsStore.svelte";

    let isAutoSaveChecked = $derived(settingsStore.otherSettings.autoSave);

    function updateAutoSave(value: boolean) {
        settingsStore.otherSettings.autoSave = value;
        settingsStore.saveSettings();
    }
</script>

<div class="flex flex-col gap-4">
    <!-- 页面大标题 -->
    <header class="border-b border-gray-100 dark:border-gray-700 pb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">其它设置</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">文颜 APP 其它相关选项</p>
    </header>

    <div class="flex items-center justify-between p-4 transition-colors">
        <div class="flex flex-col">
            <span class="text-sm font-medium">文件自动回写</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">侧边栏打开的文件，修改后会自动回写</span>
        </div>
        <ToggleSwitcher isChecked={isAutoSaveChecked} onChange={updateAutoSave} />
    </div>
</div>
