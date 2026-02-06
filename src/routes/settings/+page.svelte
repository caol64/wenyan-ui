<script lang="ts">
    import { settingsStore, localStorageSettingsAdapter, SettingsModal } from "../../..";
    import { onMount } from "svelte";

    onMount(async () => {
        await settingsStore.register(localStorageSettingsAdapter);
    });
</script>

<div class="h-screen w-full overflow-auto">
    <SettingsModal isOpen={true} onClose={() => {}} />
</div>
