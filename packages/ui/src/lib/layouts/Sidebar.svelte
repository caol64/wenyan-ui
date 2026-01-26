<script lang="ts">
    import BuiltinThemeList from "./BuiltinThemeList.svelte";
    import ToggleSwitcher from "../components/ToggleSwitcher.svelte";
    import SegmentedControl from "../components/SegmentedControl.svelte";
    import DropdownList from "../components/DropdownList.svelte";
    import RightSideToggle from "../components/RightSideToggle.svelte";
    import CustomThemeList from "./CustomThemeList.svelte";

    let followTheme = $state(false);
    let followThemeCode = $state(true);

    let fontSize = $state("14");
    let fontFamily = $state("sans"); // serif, sans, mono
    let fontWeight = $state("normal"); // light, normal, bold

    let letterSpacing = $state("standard"); // small, standard, large, huge
    let lineHeight = $state("standard");
    let paragraphSpacing = $state("standard");
</script>

<!-- 主容器 -->
<div class="mx-auto w-full h-full bg-[#f2f2f2] dark:bg-[#323232] p-2 overflow-y-auto">
    <!-- 顶部标题 -->
    <div class="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
        <h2 class="text-sm font-bold">选择主题</h2>
        <RightSideToggle />
    </div>

    <!-- 内置主题 -->
    <BuiltinThemeList />

    <!-- 自定义主题 -->
    <CustomThemeList />

    <!-- 分隔线 -->
    <div class="my-4 h-px bg-gray-300"></div>

    <!-- 段落设置 -->
    <div class="mb-4 space-y-4">
        <h2 class="text-sm font-bold">段落设置</h2>

        <!-- 跟随主题开关 -->
        <div class="flex items-center justify-between">
            <span class="text-sm">跟随主题</span>
            <ToggleSwitcher isChecked={followTheme} onChange={(v) => (followTheme = v)} />
        </div>

        <!-- 如果不跟随主题，显示详细设置 (这里为了展示UI，不做if隐藏) -->
        <div class="space-y-4" class:opacity-50={followTheme} class:pointer-events-none={followTheme}>
            <!-- 字体大小 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">字体大小</label>
                <DropdownList
                    options={[
                        { label: "12px", value: "12" },
                        { label: "13px", value: "13" },
                        { label: "14px", value: "14" },
                        { label: "15px", value: "15" },
                        { label: "16px", value: "16" },
                    ]}
                    current={fontSize}
                    class="w-24"
                />
            </div>

            <!-- 字体 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">字体</label>
                <SegmentedControl
                    options={[
                        { label: "衬线", value: "serif" },
                        { label: "无衬线", value: "sans" },
                        { label: "等宽", value: "mono" },
                    ]}
                    current={fontFamily}
                    onChange={(v) => (fontFamily = v)}
                    title="字体选择"
                />
            </div>

            <!-- 文字粗细 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">文字粗细</label>
                <SegmentedControl
                    options={[
                        { label: "较细", value: "light" },
                        { label: "标准", value: "normal" },
                        { label: "较粗", value: "bold" },
                    ]}
                    current={fontWeight}
                    onChange={(v) => (fontWeight = v)}
                    title="文字粗细选择"
                />
            </div>

            <!-- 字间距 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">字间距</label>
                <SegmentedControl
                    options={[
                        { label: "小", value: "small" },
                        { label: "标准", value: "standard" },
                        { label: "较大", value: "large" },
                        { label: "大", value: "huge" },
                    ]}
                    current={letterSpacing}
                    onChange={(v) => (letterSpacing = v)}
                    title="字间距选择"
                />
            </div>

            <!-- 行间距 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">行间距</label>
                <SegmentedControl
                    options={[
                        { label: "小", value: "small" },
                        { label: "标准", value: "standard" },
                        { label: "较大", value: "large" },
                        { label: "大", value: "huge" },
                    ]}
                    current={lineHeight}
                    onChange={(v) => (lineHeight = v)}
                    title="行间距选择"
                />
            </div>

            <!-- 段落间距 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">段落间距</label>
                <SegmentedControl
                    options={[
                        { label: "小", value: "small" },
                        { label: "标准", value: "standard" },
                        { label: "较大", value: "large" },
                        { label: "大", value: "huge" },
                    ]}
                    current={paragraphSpacing}
                    onChange={(v) => (paragraphSpacing = v)}
                    title="段落间距选择"
                />
            </div>
        </div>
    </div>

    <!-- 分隔线 -->
    <div class="my-4 h-px bg-gray-300"></div>

    <!-- 代码块设置 -->
    <div class="mb-4 space-y-4">
        <h2 class="text-sm font-bold">代码块设置</h2>
        <!-- 跟随主题开关 -->
        <div class="flex items-center justify-between">
            <span class="text-sm">跟随主题</span>
            <ToggleSwitcher isChecked={followThemeCode} onChange={(v) => (followThemeCode = v)} />
        </div>
    </div>
</div>
