<script lang="ts">
    import ToggleSwitcher from "../components/ToggleSwitcher.svelte";
    import SegmentedControl from "../components/SegmentedControl.svelte";
    import { settingsStore } from "../stores/settingsStore.svelte";

    let paragraphSettings = settingsStore.paragraphSettings;

    function handleFollowThemeChange(value: boolean) {
        paragraphSettings.isFollowTheme = value;
        settingsStore.saveSettings();
    }

    function handleFontSizeChange(value: string) {
        paragraphSettings.fontSize = value;
        settingsStore.saveSettings();
    }

    function handleFontFamilyChange(value: string) {
        paragraphSettings.fontFamily = value;
        settingsStore.saveSettings();
    }

    function handleFontWeightChange(value: string) {
        paragraphSettings.fontWeight = value;
        settingsStore.saveSettings();
    }

    function handleLetterSpacingChange(value: string) {
        paragraphSettings.letterSpacing = value;
        settingsStore.saveSettings();
    }

    function handleLineHeightChange(value: string) {
        paragraphSettings.lineHeight = value;
        settingsStore.saveSettings();
    }

    function handleParagraphSpacingChange(value: string) {
        paragraphSettings.paragraphSpacing = value;
        settingsStore.saveSettings();
    }
</script>

<div class="mb-4 space-y-4">
    <h2 class="text-sm font-bold">段落设置</h2>

    <!-- 跟随主题开关 -->
    <div class="flex items-center justify-between">
        <span class="text-sm">跟随主题</span>
        <ToggleSwitcher isChecked={paragraphSettings.isFollowTheme} onChange={handleFollowThemeChange} />
    </div>

    {#if !paragraphSettings.isFollowTheme}
        <div class="space-y-4" class:opacity-50={paragraphSettings.isFollowTheme} class:pointer-events-none={paragraphSettings.isFollowTheme}>
            <!-- 字体大小 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">字体大小</span>
                <SegmentedControl
                    options={[
                        { label: "12px", value: "12px" },
                        { label: "13px", value: "13px" },
                        { label: "14px", value: "14px" },
                        { label: "15px", value: "15px" },
                        { label: "16px", value: "16px" },
                        { label: "17px", value: "17px" },
                        { label: "18px", value: "18px" },
                    ]}
                    current={paragraphSettings.fontSize}
                    onChange={handleFontSizeChange}
                    title="字体大小选择"
                />
            </div>

            <!-- 字体 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">字体</span>
                <SegmentedControl
                    options={[
                        { label: "衬线", value: "serif" },
                        { label: "无衬线", value: "sans" },
                        { label: "等宽", value: "mono" },
                    ]}
                    current={paragraphSettings.fontFamily}
                    onChange={handleFontFamilyChange}
                    title="字体选择"
                />
            </div>

            <!-- 文字粗细 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">文字粗细</span>
                <SegmentedControl
                    options={[
                        { label: "较细", value: "300" },
                        { label: "标准", value: "400" },
                        { label: "较粗", value: "500" },
                    ]}
                    current={paragraphSettings.fontWeight}
                    onChange={handleFontWeightChange}
                    title="文字粗细选择"
                />
            </div>

            <!-- 字间距 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">字间距</span>
                <SegmentedControl
                    options={[
                        { label: "小", value: "0.05em" },
                        { label: "标准", value: "0.1em" },
                        { label: "较大", value: "0.15em" },
                        { label: "大", value: "0.2em" },
                    ]}
                    current={paragraphSettings.letterSpacing}
                    onChange={handleLetterSpacingChange}
                    title="字间距选择"
                />
            </div>

            <!-- 行间距 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">行间距</span>
                <SegmentedControl
                    options={[
                        { label: "小", value: "1.5" },
                        { label: "标准", value: "1.75" },
                        { label: "较大", value: "2" },
                        { label: "大", value: "2.25" },
                    ]}
                    current={paragraphSettings.lineHeight}
                    onChange={handleLineHeightChange}
                    title="行间距选择"
                />
            </div>

            <!-- 段落间距 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">段落间距</span>
                <SegmentedControl
                    options={[
                        { label: "小", value: "0.75em" },
                        { label: "标准", value: "1em" },
                        { label: "较大", value: "1.5em" },
                        { label: "大", value: "2em" },
                    ]}
                    current={paragraphSettings.paragraphSpacing}
                    onChange={handleParagraphSpacingChange}
                    title="段落间距选择"
                />
            </div>
        </div>
    {/if}
</div>
