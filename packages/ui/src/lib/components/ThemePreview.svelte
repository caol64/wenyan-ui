<script lang="ts">
    import { settingsStore } from "$lib/store.svelte";
    import { comboCodeblockSettings, comboParagraphSettings } from "$lib/stylesCombo";
    import { type CodeblockSettings, type ParagraphSettings } from "$lib/types";
    import { wenyanRenderer, globalState } from "$lib/wenyan.svelte";
    import { getMacStyleCss } from "@wenyan-md/core";

    let { scrollRef = $bindable() }: { scrollRef?: HTMLElement | null } = $props();
    let codeblockSettings = $derived(settingsStore.getSettings().codeblockSettings ?? {});
    let paragraphSettings = $derived(settingsStore.getSettings().paragraphSettings ?? {});

    $effect(() => {
        wenyanRenderer.render(globalState.getMarkdownText());
    });

    $effect(() => {
        updateTheme(globalState.getCurrentThemeCss());
        if (globalState.getPlatform() === "wechat") {
            updateCodeblock(codeblockSettings);
            updateParagraph(paragraphSettings);
            updateMacStyle(codeblockSettings);
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

    function updateMacStyle(codeblockSettings: CodeblockSettings) {
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
</script>

<div bind:this={scrollRef} class="h-full w-full overflow-auto">
    <div class="m-auto w-105 outline-none shadow-[0_0_60px_rgba(0,0,0,0.1)] p-5">
        <section id="wenyan">
            {@html wenyanRenderer.html}
        </section>
    </div>
</div>
