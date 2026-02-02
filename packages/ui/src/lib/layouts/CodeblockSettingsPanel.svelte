<script lang="ts">
    import DropdownList from "$lib/components/DropdownList.svelte";
    import SegmentedControl from "$lib/components/SegmentedControl.svelte";
    import ToggleSwitcher from "$lib/components/ToggleSwitcher.svelte";
    import { getAllHlThemes } from "@wenyan-md/core";
    import { settingsStore } from "$lib/store.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    let codeblockSettings = $derived(settingsStore.getSettings().codeblockSettings || {});
    let followTheme = $derived(codeblockSettings.isFollowTheme ? true : false);
    let isMacStyle = $derived(codeblockSettings.isMacStyle ? "1" : "0"); // 1 开启，0 关闭
    let fontSize = $derived(codeblockSettings.fontSize ?? "12px");
    let hlThemeId = $derived(codeblockSettings.hlThemeId ?? "github");
    const allHlThemes = getAllHlThemes();
    const hlThemeOptions = allHlThemes.map((theme) => ({
        label: theme.id,
        value: theme.id,
    }));

    function handleFollowThemeChange(value: boolean) {
        followTheme = value;
        settingsStore.updateCodeblockSetting("isFollowTheme", followTheme);
    }

    function handleMacStyleChange(value: string) {
        isMacStyle = value;
        settingsStore.updateCodeblockSetting("isMacStyle", isMacStyle === "1");
    }

    function handleHlThemeChange(value: string) {
        hlThemeId = value;
        globalState.setCurrentHlTheme(hlThemeId);
        settingsStore.updateCodeblockSetting("hlThemeId", hlThemeId);
    }

    function handleFontSizeChange(value: string) {
        fontSize = value;
        settingsStore.updateCodeblockSetting("fontSize", fontSize);
    }
</script>

<div class="mb-4 space-y-4">
    <h2 class="text-sm font-bold">代码块设置</h2>
    <!-- 跟随主题开关 -->
    <div class="flex items-center justify-between">
        <span class="text-sm">跟随主题</span>
        <ToggleSwitcher isChecked={followTheme} onChange={handleFollowThemeChange} />
    </div>
    {#if !followTheme}
        <!-- Mac 风格 -->
        <div class="space-y-4">
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">Mac 风格</span>
                <SegmentedControl
                    options={[
                        { label: "开启", value: "1" },
                        { label: "关闭", value: "0" },
                    ]}
                    current={isMacStyle}
                    onChange={handleMacStyleChange}
                    title="Mac 风格选择"
                />
            </div>
            <!-- 字体大小 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">字体大小</span>
                <SegmentedControl
                    options={[
                        { label: "12px", value: "12px" },
                        { label: "13px", value: "13px" },
                        { label: "14px", value: "14px" },
                        { label: "15px", value: "15px" },
                        { label: "16px", value: "16px" },
                    ]}
                    current={fontSize}
                    onChange={handleFontSizeChange}
                    title="字体大小选择"
                />
            </div>
            <!-- 高亮主题 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">高亮主题</span>
                <DropdownList
                    options={hlThemeOptions}
                    current={hlThemeId}
                    onChange={handleHlThemeChange}
                    class="w-48"
                />
            </div>
        </div>
    {/if}
</div>
