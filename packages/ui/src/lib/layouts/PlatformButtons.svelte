<script lang="ts">
    import WeChatButton from "../buttons/WeChatButton.svelte";
    import ToutiaoButton from "../buttons/ToutiaoButton.svelte";
    import ZhihuButton from "../buttons/ZhihuButton.svelte";
    import JuejinButton from "../buttons/JuejinButton.svelte";
    import MediumButton from "../buttons/MediumButton.svelte";
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
            console.log("Zhihu button clicked");
        }} w={w}
    />
    <JuejinButton
        onClick={() => {
            console.log("Juejin button clicked");
        }} w={w}
    />
    <MediumButton
        onClick={() => {
            console.log("Medium button clicked");
        }} w={w}
    />
</div>
