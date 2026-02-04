<script lang="ts">
    import { fly } from "svelte/transition";
    import { type Snippet } from "svelte";

    let {
        isOpen,
        title = "提示",
        children,
        footer,
        width = "max-w-lg",
        onClose,
    }: {
        isOpen: boolean;
        title?: string;
        children: Snippet;
        footer?: Snippet;
        width?: string;
        onClose?: () => void;
    } = $props();

    function close() {
        if (onClose) {
            onClose();
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape" && isOpen) {
            close();
        }
    }

</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all"
        onclick={close}
        onkeydown={close}
        role="dialog"
        aria-modal="true"
        tabindex="0"
    >
        <div
            class="bg-white dark:bg-zinc-900 w-full rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden {width}"
            transition:fly={{ y: 20, duration: 300 }}
            onkeydown={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
            tabindex="0"
        >
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-6 py-4">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {title}
                </h3>
                <button
                    onclick={close}
                    class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-6 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {@render children()}
            </div>

            <!-- Footer (Optional) -->
            {#if footer}
                <div
                    class="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 flex justify-end gap-3"
                >
                    {@render footer()}
                </div>
            {/if}
        </div>
    </div>
{/if}
