<script lang="ts">
    import { TitleBar } from "$lib/layouts";
    import MacWindowButtons from "$lib/layouts/MacWindowButtons.svelte";
    import Win32WindowButtons from "$lib/layouts/Win32WindowButtons.svelte";
</script>

<div class="h-screen w-full overflow-auto">
    <TitleBar />
    <MacWindowButtons minimizeWindow={() => {}} maximizeWindow={() => {}} closeWindow={() => {}} />
    <Win32WindowButtons minimizeWindow={() => {}} maximizeWindow={() => {}} closeWindow={() => {}} />
</div>
