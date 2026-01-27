<script lang="ts">
    import { settingsStore } from "$lib/store.svelte";
    import { type CodeblockSettings, type CssUpdate, type ParagraphSettings } from "$lib/types";
    import { wenyanRenderer, globalState } from "$lib/wenyan.svelte";
    import { createCssModifier, monospace, macStyleCss, serif, sansSerif } from "@wenyan-md/core";

    let { scrollRef = $bindable() }: { scrollRef?: HTMLElement | null } = $props();
    let codeblockSettings = $derived(settingsStore.getSettings()?.codeblockSettings || {});
    let paragraphSettings = $derived(settingsStore.getSettings()?.paragraphSettings || {});

    $effect(() => {
        wenyanRenderer.render(globalState.getMarkdownText());
    });

    $effect(() => {
        updateTheme(globalState.getCurrentThemeCss());
        updateCodeblock(codeblockSettings);
        updateParagraph(paragraphSettings);
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
        const isFollowTheme = codeblockSettings.isFollowTheme ?? true;
        const isMacStyle = isFollowTheme ? true : (codeblockSettings.isMacStyle ?? true);
        const fontSize = isFollowTheme ? "12px" : (codeblockSettings.fontSize ?? "12px");
        const fontFamily = isFollowTheme ? monospace : (codeblockSettings.fontFamily ?? monospace);
        const s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
        if (s && s.textContent) {
            s.textContent = createCssModifier({
                "#wenyan pre code": [
                    {
                        property: "font-family",
                        value: fontFamily,
                        append: true,
                    },
                ],
                "#wenyan pre": [
                    {
                        property: "font-size",
                        value: fontSize,
                        append: true,
                    },
                ],
            })(s.textContent);
        }
        updateMacStyle(isMacStyle);
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

    function updateMacStyle(isMacStyle: boolean) {
        let s = document.getElementById("wenyan-macstyle-style") as HTMLStyleElement | null;
        if (!s) {
            s = document.createElement("style");
            s.id = "wenyan-macstyle-style";
            document.head.appendChild(s);
        }
        s.textContent = isMacStyle ? macStyleCss : "";
    }

    function updateParagraph(paragraphSettings: ParagraphSettings) {
        const isFollowTheme = paragraphSettings.isFollowTheme ?? true;
        if (isFollowTheme) {
            return;
        }
        const classes: CssUpdate[] = [];
        let fontFamilyUpdate: CssUpdate | undefined;
        if (paragraphSettings.fontSize) {
            classes.push({ property: "font-size", value: paragraphSettings.fontSize, append: true });
        }
        if (paragraphSettings.fontFamily) {
            let fontValue = "";

            if (paragraphSettings.fontFamily === "serif") {
                fontValue = serif;
            } else if (paragraphSettings.fontFamily === "sans") {
                fontValue = sansSerif;
            } else if (paragraphSettings.fontFamily === "mono") {
                fontValue = monospace;
            }

            if (fontValue) {
                fontFamilyUpdate = {
                    property: "font-family",
                    value: fontValue,
                    append: true,
                };
                classes.push(fontFamilyUpdate);
            }
        }
        if (paragraphSettings.fontWeight) {
            classes.push({ property: "font-weight", value: paragraphSettings.fontWeight, append: true });
        }
        if (paragraphSettings.letterSpacing) {
            classes.push({ property: "letter-spacing", value: paragraphSettings.letterSpacing, append: true });
        }
        if (paragraphSettings.lineHeight) {
            classes.push({ property: "line-height", value: paragraphSettings.lineHeight, append: true });
        }
        if (paragraphSettings.paragraphSpacing) {
            classes.push({ property: "margin", value: `${paragraphSettings.paragraphSpacing} 0`, append: true });
        }
        const s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
        if (s && s.textContent) {
            // 标题只更新字体，不更新间距等其他属性
            const headingUpdates = fontFamilyUpdate ? [fontFamilyUpdate] : [];
            s.textContent = createCssModifier({
                "#wenyan p": classes,
                "#wenyan ul": classes,
                "#wenyan ol": classes,
                "#wenyan h1": headingUpdates,
                "#wenyan h2": headingUpdates,
                "#wenyan h3": headingUpdates,
                "#wenyan h4": headingUpdates,
                "#wenyan h5": headingUpdates,
                "#wenyan h6": headingUpdates,
            })(s.textContent);
        }
    }
</script>

<div bind:this={scrollRef} class="h-full w-full overflow-auto">
    <section id="wenyan" class="m-auto w-105 outline-none shadow-[0_0_60px_rgba(0,0,0,0.1)] p-5">
        {@html wenyanRenderer.html}
    </section>
</div>
