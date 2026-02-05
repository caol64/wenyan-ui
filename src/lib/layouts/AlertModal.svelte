<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { globalState } from "$lib/wenyan.svelte";

    let alertMessage = $derived(globalState.getAlertMessage());
    let isOpen = $derived(alertMessage !== null);
    let title = $derived(alertMessage?.title);
    let bodyHtml = $derived(alertMessage ? `<p>${alertMessage.message}</p>` : "");

    function close() {
        globalState.setAlertMessage(null);
    }
</script>

<Modal {isOpen} {title} onClose={close}>
    <!-- body -->
    {@html bodyHtml}

    <!-- footer -->
    {#snippet footer()}
        <button
            class="smooth-border rounded px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
            onclick={close}
        >
            我知道了
        </button>
    {/snippet}
</Modal>
