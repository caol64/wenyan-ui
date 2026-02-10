<script lang="ts">
    let {
        minimizeWindow,
        maximizeWindow,
        closeWindow,
        class: className = "",
    }: {
        minimizeWindow: () => void;
        maximizeWindow: () => void;
        closeWindow: () => void;
        class?: string;
    } = $props();

    // 基础按钮样式：圆型、固定大小、微弱边框
    const baseBtnClass =
        "relative flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border border-black/10 transition-all active:brightness-90 outline-none";

    // 图标样式：默认透明，父级 hover 时显示，深色文本
    const iconClass = "opacity-0 group-hover:opacity-100 text-black/60 w-2 h-2 transition-opacity duration-100";
</script>

<!-- 添加 'group' 类，使得悬停在容器上时，所有子按钮的图标都显示 -->
<div class="group flex items-center gap-2 h-7.5 {className}">
    <!-- 关闭 (红) -->
    <button class="{baseBtnClass} bg-[#ff5f56]" aria-label="Close" onclick={closeWindow}>
        <svg
            class={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    </button>

    <!-- 最小化 (黄) -->
    <button class="{baseBtnClass} bg-[#ffbd2e]" aria-label="Minimize" onclick={minimizeWindow}>
        <svg
            class={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M5 12h14" />
        </svg>
    </button>

    <!-- 最大化 (绿) -->
    <button class="{baseBtnClass} bg-[#27c93f]" aria-label="Maximize" onclick={maximizeWindow}>
        <svg
            class={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
        </svg>
    </button>
</div>
