<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    /**
     * 分段控制器组件 (Segmented Control)
     * 用于在平级的互斥选项中进行切换。
     */
    let {
        options,
        current,
        onChange,
        title = "Segmented Control",
        class: className = "",
        ...rest
    }: {
        options: { label: string; value: string }[];
        current: string;
        onChange: (value: string) => void;
        title?: string;
        class?: string;
    } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="flex w-full rounded-md p-1 bg-gray-200 dark:bg-gray-800 {className}" role="group" aria-label={title} {...rest}>
    {#each options as option}
        {@const isActive = current === option.value}
        <button
            class="flex-1 rounded-sm py-0.5 text-xs font-medium transition-all duration-200 focus:outline-none cursor-pointer"
            class:bg-white={isActive}
            class:dark:bg-gray-600={isActive}
            class:shadow-sm={isActive}
            class:text-gray-900={isActive}
            class:dark:text-white={isActive}
            class:text-gray-500={!isActive}
            class:dark:text-gray-400={!isActive}
            class:hover:text-gray-700={!isActive}
            class:dark:hover:text-gray-200={!isActive}
            onclick={() => onChange(option.value)}
            aria-pressed={isActive}
        >
            {option.label}
        </button>
    {/each}
</div>
