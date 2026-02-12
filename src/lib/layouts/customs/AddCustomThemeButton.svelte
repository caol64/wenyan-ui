<script lang="ts">
    import { globalState } from "../../wenyan.svelte";

</script>

<button class="flex items-center justify-end gap-1 cursor-pointer" onclick={() => globalState.isShowCreateThemeModal = true}>
    <span class="text-sm">创建新主题</span>
    <span class="text-blue-500">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
    </span>
</button>
