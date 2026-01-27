<script lang="ts">
    import BuiltinThemeList from "./BuiltinThemeList.svelte";
    import RightSideToggle from "$lib/components/RightSideToggle.svelte";
    import CustomThemeList from "./CustomThemeList.svelte";
    import CodeblockSettings from "./CodeblockSettings.svelte";
    import ParagraphSettings from "./ParagraphSettings.svelte";

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
    <ParagraphSettings />

    <!-- 分隔线 -->
    <div class="my-4 h-px bg-gray-300"></div>

    <!-- 代码块设置 -->
    <CodeblockSettings />
</div>
