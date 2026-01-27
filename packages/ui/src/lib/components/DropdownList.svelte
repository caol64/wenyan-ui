<script lang="ts">
    /**
     * 下拉列表组件 (Dropdown List)
     * 用于在折叠的列表中展示一组平级选项。
     */
    let {
        options,
        current,
        onChange,
        class: className = "",
    }: {
        options: { label: string; value: string }[];
        current: string;
        onChange: (value: string) => void;
        class?: string;
    } = $props();
</script>

<div class="relative bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-md border border-gray-300 dark:border-gray-700 {className}">
    <select
        bind:value={current}
        onchange={(e) => onChange((e.target as HTMLSelectElement).value)}
        class="w-full appearance-none py-1 pl-3 pr-8 text-sm leading-5 rounded-md focus:outline-none"
    >
        {#each options as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
    <!-- 自定义下拉箭头 -->
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <div class="bg-blue-500 rounded p-0.5">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" /></svg
            >
        </div>
    </div>
</div>
