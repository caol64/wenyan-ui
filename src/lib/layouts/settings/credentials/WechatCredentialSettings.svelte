<script lang="ts">
    import { credentialStore } from "../../../stores/credentialStore.svelte";
    import { getUploadHelpClick } from "../../../contexts/externalLink";

    let wechat = credentialStore.wechat;
    let debounceTimer: ReturnType<typeof setTimeout>;

    const handleHelpClick = getUploadHelpClick();

    $effect(() => {
        const _deps = [wechat.appId, wechat.appSecret];
        clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => {
            credentialStore.saveCredential("wechat");
        }, 300);
        return () => clearTimeout(debounceTimer);
    });
</script>

<div class="flex flex-col gap-6">
    <header class="flex items-center border-b border-gray-100 dark:border-gray-700 pb-4">
        <div>
            <h2 class="text-xl font-bold">公众号凭据</h2>
            <p class="text-sm text-gray-500 mt-1">配置微信公众号开发者凭据以上传图片和发布文章</p>
        </div>
    </header>

    <div class="flex flex-col gap-4">
        <!-- AppID -->
        <div class="flex flex-col gap-2">
            <label for="appId" class="block text-sm font-medium"> 开发者ID (AppID) </label>
            <input
                type="text"
                id="appId"
                bind:value={wechat.appId}
                placeholder="如：wx6e1234567890efa3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none transition-shadow"
            />
        </div>

        <!-- AppSecret -->
        <div class="flex flex-col gap-2">
            <label for="appSecret" class="block text-sm font-medium"> 开发者密码 (AppSecret) </label>
            <input
                type="password"
                id="appSecret"
                bind:value={wechat.appSecret}
                placeholder="如：d9f1abcdef01234567890abcdef82397"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none transition-shadow"
            />
        </div>

        <!-- 帮助链接 -->
        <div class="flex flex-col items-end gap-1 pt-2">
            <p class="text-xs text-amber-600 font-medium">⚠️ 请务必开启“IP白名单”</p>
            <button
                onclick={handleHelpClick}
                class="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
                使用帮助
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    /></svg
                >
            </button>
        </div>
    </div>
</div>
