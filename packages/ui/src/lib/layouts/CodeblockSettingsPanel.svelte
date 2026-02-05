<script lang="ts">
    import DropdownList from "$lib/components/DropdownList.svelte";
    import SegmentedControl from "$lib/components/SegmentedControl.svelte";
    import ToggleSwitcher from "$lib/components/ToggleSwitcher.svelte";
    import { getAllHlThemes } from "@wenyan-md/core";
    import { settingsStore } from "$lib/stores/settingsStore.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    let codeblockSettings = settingsStore.codeblockSettings;
    const allHlThemes = getAllHlThemes();
    const hlThemeOptions = allHlThemes.map((theme) => ({
        label: theme.id,
        value: theme.id,
    }));

    function handleFollowThemeChange(value: boolean) {
        codeblockSettings.isFollowTheme = value;
        settingsStore.saveSettings();
    }

    function handleMacStyleChange(value: string) {
        codeblockSettings.isMacStyle = value === "1";
        settingsStore.saveSettings();
    }

    function handleHlThemeChange(value: string) {
        codeblockSettings.hlThemeId = value;
        globalState.setCurrentHlTheme(codeblockSettings.hlThemeId);
        settingsStore.saveSettings();
    }

    function handleFontSizeChange(value: string) {
        codeblockSettings.fontSize = value;
        settingsStore.saveSettings();
    }
</script>

<div class="mb-4 space-y-4">
    <h2 class="text-sm font-bold">代码块设置</h2>
    <!-- 跟随主题开关 -->
    <div class="flex items-center justify-between">
        <span class="text-sm">跟随主题</span>
        <ToggleSwitcher isChecked={codeblockSettings.isFollowTheme} onChange={handleFollowThemeChange} />
    </div>
    {#if !codeblockSettings.isFollowTheme}
        <!-- Mac 风格 -->
        <div class="space-y-4">
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">Mac 风格</span>
                <SegmentedControl
                    options={[
                        { label: "开启", value: "1" },
                        { label: "关闭", value: "0" },
                    ]}
                    current={codeblockSettings.isMacStyle ? "1" : "0"}
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
                    current={codeblockSettings.fontSize}
                    onChange={handleFontSizeChange}
                    title="字体大小选择"
                />
            </div>
            <!-- 高亮主题 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">高亮主题</span>
                <DropdownList
                    options={hlThemeOptions}
                    current={codeblockSettings.hlThemeId}
                    onChange={handleHlThemeChange}
                    class="w-48"
                />
            </div>
        </div>
    {/if}
</div>
