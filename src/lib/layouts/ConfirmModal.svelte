<script lang="ts">
    import Modal from "../components/Modal.svelte";
    import { globalState } from "../wenyan.svelte";

    let confirmMessage = $derived(globalState.getConfirmMessage());
    let isOpen = $derived(confirmMessage !== null);
    let title = $derived(confirmMessage?.title);
    let bodyHtml = $derived(confirmMessage ? `<p>${confirmMessage.message}</p>` : "");

    function close() {
        globalState.setConfirmMessage(null);
    }

    function handleConfirm() {
        if (confirmMessage?.action) {
            confirmMessage.action();
        }
        close();
    }
</script>

<Modal {isOpen} {title} onClose={close}>
    <!-- body -->
    {@html bodyHtml}

    <!-- footer -->
    {#snippet footer()}
        <div class="flex items-center gap-3">
            <button
                class="smooth-border rounded px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                onclick={close}
            >
                取消
            </button>

            <button
                class="rounded px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm transition-colors cursor-pointer"
                onclick={handleConfirm}
            >
                {confirmMessage?.actionLabel || "确认"}
            </button>
        </div>
    {/snippet}
</Modal>
