<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import SettingsPage from "./SettingsPage.svelte";

    let { isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title?: string } = $props();
</script>

<Modal {isOpen} {title} onClose={onClose} width="max-w-4xl" isShowHeader={false}>
    <SettingsPage />
</Modal>
