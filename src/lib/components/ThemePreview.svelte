<script lang="ts">
    import { settingsStore, type CodeblockSettings, type ParagraphSettings } from "../stores/settingsStore.svelte";
    import { comboCodeblockSettings, comboParagraphSettings } from "../services/stylesCombo";
    import { wenyanRenderer, globalState } from "../wenyan.svelte";
    import { getMacStyleCss } from "@wenyan-md/core";
    import { getDownloadImageToBase64, getPreviewClick } from "../contexts/preview";
    import { processImages } from "../services/processImages.svelte";

    let { scrollRef = $bindable() }: { scrollRef?: HTMLElement | null } = $props();

    const onPreviewClick = getPreviewClick();
    const downloadImageToBase64 = getDownloadImageToBase64();

    $effect(() => {
        wenyanRenderer.render(globalState.getMarkdownText());
    });

    $effect(() => {
        updateTheme(globalState.getCurrentThemeCss());
        if (globalState.getPlatform() === "wechat") {
            updateCodeblock(settingsStore.codeblockSettings);
            updateParagraph(settingsStore.paragraphSettings);
            updateMacStyle(settingsStore.codeblockSettings);
        } else {
            updateMacStyle({ isFollowTheme: false, isMacStyle: false });
        }
    });

    $effect(() => {
        updateHlTheme(globalState.getCurrentHlThemeCss());
    });

    function updateTheme(themeCss: string) {
        let s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
        if (!s) {
            s = document.createElement("style");
            s.id = "wenyan-theme-style";
            document.head.appendChild(s);
        }
        s.textContent = themeCss;
    }

    function updateCodeblock(codeblockSettings: CodeblockSettings) {
        const s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
        if (s && s.textContent) {
            const result = comboCodeblockSettings(s.textContent, codeblockSettings);
            if (result !== s.textContent) {
                s.textContent = result;
            }
        }
    }

    function updateHlTheme(hlThemeCss: string) {
        let s = document.getElementById("wenyan-hltheme-style") as HTMLStyleElement | null;
        if (!s) {
            s = document.createElement("style");
            s.id = "wenyan-hltheme-style";
            document.head.appendChild(s);
        }
        s.textContent = hlThemeCss;
    }

    function updateMacStyle(codeblockSettings: Partial<CodeblockSettings>) {
        const isFollowTheme = codeblockSettings.isFollowTheme ?? true;
        const isMacStyle = isFollowTheme ? true : (codeblockSettings.isMacStyle ?? true);
        let s = document.getElementById("wenyan-macstyle-style") as HTMLStyleElement | null;
        if (!s) {
            s = document.createElement("style");
            s.id = "wenyan-macstyle-style";
            document.head.appendChild(s);
        }
        s.textContent = isMacStyle ? getMacStyleCss() : "";
    }

    function updateParagraph(paragraphSettings: ParagraphSettings) {
        const s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
        if (s && s.textContent) {
            const result = comboParagraphSettings(s.textContent, paragraphSettings);
            if (result !== s.textContent) {
                s.textContent = result;
            }
        }
    }

    function handleClick(node: HTMLElement) {
        const onClick = (e: MouseEvent) => {
            onPreviewClick?.();
        };

        node.addEventListener("click", onClick);

        return {
            destroy() {
                node.removeEventListener("click", onClick);
            },
        };
    }
</script>

<div use:handleClick bind:this={scrollRef} class="h-full w-full scroll-container">
    <div class="m-auto w-105 outline-none shadow-[0_0_60px_rgba(0,0,0,0.1)] p-5">
        <section id="wenyan" use:processImages={{ download: downloadImageToBase64 }}>
            {@html wenyanRenderer.html}
        </section>
    </div>
</div>

<style>
    .scroll-container {
        scrollbar-width: auto;
        scrollbar-color: #c2c2c2 transparent;
        overflow: auto;
        overscroll-behavior: none;
    }

    @supports (background: -webkit-named-image(i)) {
        .scroll-container {
            scrollbar-width: thin;
        }
    }
</style>
