<script lang="ts">
    import BuiltinThemeList from "./BuiltinThemeList.svelte";
    import RightSideToggle from "$lib/components/RightSideToggle.svelte";
    import CustomThemeList from "./CustomThemeList.svelte";
    import CodeblockSettings from "./CodeblockSettingsPanel.svelte";
    import ParagraphSettings from "./ParagraphSettingsPanel.svelte";

</script>

<!-- 主容器 -->
<div class="mx-auto w-full h-full bg-[#f2f2f2] dark:bg-[#323232] p-2 scroll-container">
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

<style>
    .scroll-container {
        scrollbar-width: auto;
        scrollbar-color: #dadada #ffffff;
        overflow: auto;
        overscroll-behavior: none;
    }

    @supports (background: -webkit-named-image(i)) {
        .scroll-container {
            scrollbar-width: thin;
        }
    }
</style>
