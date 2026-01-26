<script lang="ts">
    import { globalState } from "$lib/wenyan.svelte";

    let { id, name }: { id: string; name: string } = $props();
</script>

<button
    class="flex w-full items-center justify-between px-1 py-0.5 text-xs transition-colors cursor-pointer"
    class:bg-blue-600={globalState.getCurrentTheme() === id}
    class:text-white={globalState.getCurrentTheme() === id}
    class:hover:bg-gray-200={globalState.getCurrentTheme() !== id}
    onclick={() => globalState.setCurrentTheme(id)}
>
    <span class="font-medium">{name}</span>
    <span
        class:text-blue-100={globalState.getCurrentTheme() === id}
        class:text-gray-500={globalState.getCurrentTheme() !== id}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg
        >
    </span>
</button>
