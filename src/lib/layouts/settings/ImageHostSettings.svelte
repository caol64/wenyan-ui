<script lang="ts">
    import { getAutoCacheChangeClick } from "../../hooks/setting";
    import ToggleSwitcher from "../../components/ToggleSwitcher.svelte";
    import { settingsStore } from "../../stores/settingsStore.svelte";
    import { globalState } from "../../wenyan.svelte";

    let isWechatChecked = $derived(settingsStore.enabledImageHost === "wechat");
    const onAutoCacheChange = getAutoCacheChangeClick();

    function toggleImageHost(host: string, enabled: boolean) {
        settingsStore.enabledImageHost = enabled ? host : "";
        settingsStore.saveSettings();
    }

    function updateAutoUploadLocal(value: boolean) {
        settingsStore.uploadSettings.autoUploadLocal = value;
        settingsStore.saveSettings();
    }

    function updateAutoUploadNetwork(value: boolean) {
        settingsStore.uploadSettings.autoUploadNetwork = value;
        settingsStore.saveSettings();
    }

    function updateAutoCache(value: boolean) {
        settingsStore.uploadSettings.autoCache = value;
        settingsStore.saveSettings();
        if (onAutoCacheChange) {
            try {
                onAutoCacheChange();
            } catch (error) {
                globalState.setAlertMessage({
                    type: "error",
                    message: `更新上传图片去重设置失败，${error instanceof Error ? error.message : String(error)}`,
                });
            }
        }
    }
</script>

<div class="flex flex-col gap-4">
    <!-- 页面大标题 -->
    <header class="border-b border-gray-100 dark:border-gray-700 pb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">图床设置</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">配置图片上传服务及相关选项</p>
    </header>

    <section class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold">启用的图床</h3>

        <div class="rounded-lg smooth-border divide-y divide-gray-100 dark:divide-gray-700">
            <!-- 微信公众号图床 -->
            <div class="flex items-center justify-between p-4 transition-colors">
                <div class="flex flex-col">
                    <span class="text-sm font-medium">公众号图床</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">使用微信公众号素材库存储图片</span>
                </div>
                <ToggleSwitcher isChecked={isWechatChecked} onChange={(v) => toggleImageHost("wechat", v)} />
            </div>
        </div>
        <!-- <p class="text-xs text-gray-500 px-1">
            * 同一时间只能启用一个图床服务。
        </p> -->
    </section>

    <section class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold">上传设置</h3>

        <div class="rounded-lg smooth-border divide-y divide-gray-100 dark:divide-gray-700">
            <!-- 自动上传 -->
            <div class="flex items-center justify-between p-4 transition-colors">
                <div class="flex flex-col">
                    <span class="text-sm font-medium">自动上传图片</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        打开或粘贴文章时，自动识别本地图片并上传至图床
                    </span>
                </div>
                <ToggleSwitcher
                    isChecked={settingsStore.uploadSettings.autoUploadLocal}
                    onChange={(v) => updateAutoUploadLocal(v)}
                />
            </div>

            <!-- 自动转存 -->
            <div class="flex items-center justify-between p-4 transition-colors">
                <div class="flex flex-col">
                    <span class="text-sm font-medium">自动转存图片</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        打开或粘贴文章时，自动识别网络图片并上传至图床
                    </span>
                </div>
                <ToggleSwitcher
                    isChecked={settingsStore.uploadSettings.autoUploadNetwork}
                    onChange={(v) => updateAutoUploadNetwork(v)}
                />
            </div>

            <!-- 图片缓存 -->
            <div class="flex items-center justify-between p-4 transition-colors">
                <div class="flex flex-col">
                    <span class="text-sm font-medium">上传图片去重</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">相同的图片不会重复上传，使用同一个链接</span>
                </div>
                <ToggleSwitcher
                    isChecked={settingsStore.uploadSettings.autoCache}
                    onChange={(v) => updateAutoCache(v)}
                />
            </div>
        </div>
    </section>
</div>
