<script lang="ts">
    import { globalState } from "../../wenyan.svelte";
    import LeftSplitRect from "../../components/icons/LeftSplitRect.svelte";
</script>

<button class="cursor-pointer" onclick={() => (globalState.isShowFileSidebar = !globalState.isShowFileSidebar)}>
    <LeftSplitRect w="14px" />
</button>
