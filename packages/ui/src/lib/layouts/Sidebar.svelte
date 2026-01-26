<script lang="ts">
    import BuiltinThemeList from "./BuiltinThemeList.svelte";
    import RightSideToggle from "../components/icons/RightSideToggle.svelte";
    import { type Snippet } from "svelte";
    import ToggleSwitcher from "$lib/components/ToggleSwitcher.svelte";
    import SegmentedControl from "$lib/components/SegmentedControl.svelte";
    import DropdownList from "$lib/components/DropdownList.svelte";

    // 图标组件 (简单的 SVG)
    const Icons = {
        Sidebar: () =>
            `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/></svg>`,
        Edit: () =>
            `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
        Plus: () =>
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
    };

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
<div class="mx-auto w-75 h-full bg-[#f2f2f2] dark:bg-[#323232] p-4 shadow-xl font-sans overflow-y-auto">
    <!-- 顶部标题 -->
    <div class="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
        <h2 class="text-sm font-bold">选择主题</h2>
        <button class="text-gray-600 hover:text-gray-900">
            <RightSideToggle />
        </button>
    </div>

    <!-- 主题列表 -->
    <BuiltinThemeList />

    <!-- 自定义主题操作 -->
    <div class="mb-6 space-y-2 px-2">
        <div class="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
            <span>自定义主题</span>
            <span class="text-blue-500">{@html Icons.Edit()}</span>
        </div>
        <div class="flex items-center justify-end gap-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
            <span>创建新主题</span>
            <span class="text-blue-500">{@html Icons.Plus()}</span>
        </div>
    </div>

    <!-- 分隔线 -->
    <div class="my-4 h-px bg-gray-300"></div>

    <!-- 段落设置 -->
    <div class="mb-4 space-y-4">
        <h3 class="text-sm font-bold text-gray-900">段落设置</h3>

        <!-- 跟随主题开关 -->
        <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700">跟随主题</span>
            <ToggleSwitcher isChecked={followTheme} onChange={(v) => (followTheme = v)} />
        </div>

        <!-- 如果不跟随主题，显示详细设置 (这里为了展示UI，不做if隐藏) -->
        <div class="space-y-4" class:opacity-50={followTheme} class:pointer-events-none={followTheme}>
            <!-- 字体大小 -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">字体大小</label>
                <DropdownList options={[
                    { label: "12px", value: "12" },
                    { label: "13px", value: "13" },
                    { label: "14px", value: "14" },
                    { label: "15px", value: "15" },
                    { label: "16px", value: "16" },
                ]} current={fontSize} class="w-24" />
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
        <h3 class="text-sm font-bold text-gray-900">代码块设置</h3>
        <!-- 跟随主题开关 -->
        <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700">跟随主题</span>
            <ToggleSwitcher isChecked={followThemeCode} onChange={(v) => (followThemeCode = v)} />
        </div>
    </div>
</div>
