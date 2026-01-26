<script lang="ts">
    let {
        isChecked,
        onChange,
        title = "Toggle Switcher",
    }: { isChecked: boolean; onChange: (value: boolean) => void; title?: string } = $props();
</script>

<button
    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    class:bg-blue-600={isChecked}
    class:bg-gray-300={!isChecked}
    onclick={() => onChange(!isChecked)}
    aria-label={title}
>
    <span
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        class:translate-x-5={isChecked}
        class:translate-x-0={!isChecked}
    ></span>
</button>
