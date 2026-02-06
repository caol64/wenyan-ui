<script lang="ts">
    import WeChatButton from "../components/buttons/WeChatButton.svelte";
    import ToutiaoButton from "../components/buttons/ToutiaoButton.svelte";
    import ZhihuButton from "../components/buttons/ZhihuButton.svelte";
    import JuejinButton from "../components/buttons/JuejinButton.svelte";
    import MediumButton from "../components/buttons/MediumButton.svelte";
    let { w = "20px" } = $props();
</script>

<div class="flex flex-row gap-4">
    <WeChatButton {w} />
    <ToutiaoButton {w} />
    <ZhihuButton {w} />
    <JuejinButton {w} />
    <MediumButton {w} />
</div>
