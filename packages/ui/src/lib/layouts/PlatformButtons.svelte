<script lang="ts">
    import WeChatButton from "$lib/components/WeChatButton.svelte";
    import ToutiaoButton from "$lib/components/ToutiaoButton.svelte";
    import ZhihuButton from "$lib/components/ZhihuButton.svelte";
    import JuejinButton from "$lib/components/JuejinButton.svelte";
    import MediumButton from "$lib/components/MediumButton.svelte";

    let { w = "20px" } = $props();
</script>

<div class="flex flex-row gap-4">
    <WeChatButton
        onClick={() => {
            console.log("WeChat button clicked");
        }} w={w}
    />
    <ToutiaoButton
        onClick={() => {
            console.log("Toutiao button clicked");
        }} w={w}
    />
    <ZhihuButton
        onClick={() => {
            console.log("Toutiao button clicked");
        }} w={w}
    />
    <JuejinButton
        onClick={() => {
            console.log("Toutiao button clicked");
        }} w={w}
    />
    <MediumButton
        onClick={() => {
            console.log("Toutiao button clicked");
        }} w={w}
    />
</div>
