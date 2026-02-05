<script lang="ts">
    import { settingsStore, localStorageSettingsAdapter } from "$lib";
    import SettingsModal from "$lib/layouts/settings/SettingsModal.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await settingsStore.register(localStorageSettingsAdapter);
    });
</script>

<div class="h-screen w-full overflow-auto">
    <SettingsModal isOpen={true} onClose={() => {}} />
</div>
