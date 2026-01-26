<script lang="ts">
    import WeChatButton from "../components/buttons/WeChatButton.svelte";
    import ToutiaoButton from "../components/buttons/ToutiaoButton.svelte";
    import ZhihuButton from "../components/buttons/ZhihuButton.svelte";
    import JuejinButton from "../components/buttons/JuejinButton.svelte";
    import MediumButton from "../components/buttons/MediumButton.svelte";
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
