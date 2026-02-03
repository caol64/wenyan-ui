<script lang="ts">
    let {
        minimizeWindow,
        maximizeWindow,
        closeWindow,
        iconSize = "16px",
        class: className = "",
    }: {
        minimizeWindow: () => void;
        maximizeWindow: () => void;
        closeWindow: () => void;
        iconSize?: string;
        class?: string;
    } = $props();

    const baseBtnClass = "inline-flex h-7.5 w-7.5 cursor-pointer items-center justify-center border-none bg-gray-200 hover:bg-white dark:bg-gray-700 transition-colors";
</script>

<div class="flex items-center {className}">
    <button class={baseBtnClass} aria-label="Minimize" onclick={minimizeWindow}>
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 14H4v-4h16" />
        </svg>
    </button>
    <button class={baseBtnClass} aria-label="Maximize" onclick={maximizeWindow}>
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
        </svg>
    </button>
    <button class={baseBtnClass} aria-label="Close" onclick={closeWindow}>
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            />
        </svg>
    </button>
</div>
