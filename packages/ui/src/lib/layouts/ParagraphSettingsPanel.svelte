<script lang="ts">
    import ToggleSwitcher from "$lib/components/ToggleSwitcher.svelte";
    import SegmentedControl from "$lib/components/SegmentedControl.svelte";
    import { settingsStore } from "$lib/store.svelte";

    let paragraphSettings = $derived(settingsStore.getSettings().paragraphSettings || {});

    let followTheme = $derived(paragraphSettings.isFollowTheme ? true : false);

    let fontSize = $derived(paragraphSettings.fontSize ?? "16px");
    let fontFamily = $derived(paragraphSettings.fontFamily ?? "sans"); // serif, sans, mono
    let fontWeight = $derived(paragraphSettings.fontWeight ?? "400"); // light, normal, bold

    let letterSpacing = $derived(paragraphSettings.letterSpacing ?? "0.1em"); // small, standard, large, huge
    let lineHeight = $derived(paragraphSettings.lineHeight ?? "1.75");
    let paragraphSpacing = $derived(paragraphSettings.paragraphSpacing ?? "1em");

    function handleFollowThemeChange(value: boolean) {
        followTheme = value;
        settingsStore.updateParagraphSetting("isFollowTheme", followTheme);
    }

    function handleFontSizeChange(value: string) {
        fontSize = value;
        settingsStore.updateParagraphSetting("fontSize", fontSize);
    }

    function handleFontFamilyChange(value: string) {
        fontFamily = value;
        settingsStore.updateParagraphSetting("fontFamily", fontFamily);
    }

    function handleFontWeightChange(value: string) {
        fontWeight = value;
        settingsStore.updateParagraphSetting("fontWeight", fontWeight);
    }

    function handleLetterSpacingChange(value: string) {
        letterSpacing = value;
        settingsStore.updateParagraphSetting("letterSpacing", letterSpacing);
    }

    function handleLineHeightChange(value: string) {
        lineHeight = value;
        settingsStore.updateParagraphSetting("lineHeight", lineHeight);
    }

    function handleParagraphSpacingChange(value: string) {
        paragraphSpacing = value;
        settingsStore.updateParagraphSetting("paragraphSpacing", paragraphSpacing);
    }
</script>

<div class="mb-4 space-y-4">
    <h2 class="text-sm font-bold">段落设置</h2>

    <!-- 跟随主题开关 -->
    <div class="flex items-center justify-between">
        <span class="text-sm">跟随主题</span>
        <ToggleSwitcher isChecked={followTheme} onChange={handleFollowThemeChange} />
    </div>

    {#if !followTheme}
        <div class="space-y-4" class:opacity-50={followTheme} class:pointer-events-none={followTheme}>
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
                        { label: "17px", value: "17px" },
                        { label: "18px", value: "18px" },
                    ]}
                    current={fontSize}
                    onChange={handleFontSizeChange}
                    title="字体大小选择"
                />
            </div>

            <!-- 字体 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">字体</span>
                <SegmentedControl
                    options={[
                        { label: "衬线", value: "serif" },
                        { label: "无衬线", value: "sans" },
                        { label: "等宽", value: "mono" },
                    ]}
                    current={fontFamily}
                    onChange={handleFontFamilyChange}
                    title="字体选择"
                />
            </div>

            <!-- 文字粗细 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">文字粗细</span>
                <SegmentedControl
                    options={[
                        { label: "较细", value: "300" },
                        { label: "标准", value: "400" },
                        { label: "较粗", value: "500" },
                    ]}
                    current={fontWeight}
                    onChange={handleFontWeightChange}
                    title="文字粗细选择"
                />
            </div>

            <!-- 字间距 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">字间距</span>
                <SegmentedControl
                    options={[
                        { label: "小", value: "0.05em" },
                        { label: "标准", value: "0.1em" },
                        { label: "较大", value: "0.15em" },
                        { label: "大", value: "0.2em" },
                    ]}
                    current={letterSpacing}
                    onChange={handleLetterSpacingChange}
                    title="字间距选择"
                />
            </div>

            <!-- 行间距 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">行间距</span>
                <SegmentedControl
                    options={[
                        { label: "小", value: "1.5" },
                        { label: "标准", value: "1.75" },
                        { label: "较大", value: "2" },
                        { label: "大", value: "2.25" },
                    ]}
                    current={lineHeight}
                    onChange={handleLineHeightChange}
                    title="行间距选择"
                />
            </div>

            <!-- 段落间距 -->
            <div class="space-y-2">
                <span class="text-sm font-medium text-gray-700">段落间距</span>
                <SegmentedControl
                    options={[
                        { label: "小", value: "0.75em" },
                        { label: "标准", value: "1em" },
                        { label: "较大", value: "1.5em" },
                        { label: "大", value: "2em" },
                    ]}
                    current={paragraphSpacing}
                    onChange={handleParagraphSpacingChange}
                    title="段落间距选择"
                />
            </div>
        </div>
    {/if}
</div>
