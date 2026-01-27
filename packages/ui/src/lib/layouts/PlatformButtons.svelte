<script lang="ts">
    import WeChatButton from "$lib/components/buttons/WeChatButton.svelte";
    import ToutiaoButton from "$lib/components/buttons/ToutiaoButton.svelte";
    import ZhihuButton from "$lib/components/buttons/ZhihuButton.svelte";
    import JuejinButton from "$lib/components/buttons/JuejinButton.svelte";
    import MediumButton from "$lib/components/buttons/MediumButton.svelte";
    let { w = "20px" } = $props();
</script>

<div class="flex flex-row gap-4">
    <WeChatButton {w} />
    <ToutiaoButton {w} />
    <ZhihuButton {w} />
    <JuejinButton {w} />
    <MediumButton {w} />
</div>
