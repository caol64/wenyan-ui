<script lang="ts">
    import type { CodeblockSettings, ParagraphSettings } from "$lib/types";
    import { WenyanRenderer } from "$lib/wenyan.svelte";
    import { getTheme, createCssModifier, monospace, getHlTheme, macStyleCss } from "@wenyan-md/core";

    let {
        markdownText = "",
        themeIdOrCss = "default",
        paragraphSettings = {},
        codeblockSettings = {},
    }: {
        markdownText?: string;
        themeIdOrCss?: string;
        paragraphSettings?: ParagraphSettings;
        codeblockSettings?: CodeblockSettings;
    } = $props();

    const renderer = new WenyanRenderer();

    $effect(() => {
        renderer.render(markdownText);
    });

    $effect(() => {
        updateAll(themeIdOrCss, codeblockSettings);
    });

    async function updateAll(themeIdOrCss: string, codeblockSettings: CodeblockSettings) {
        await updateTheme(themeIdOrCss);
        await updateHlTheme(codeblockSettings);
    }

    async function updateTheme(themeIdOrCss: string) {
        let styles = "";
        if (themeIdOrCss.startsWith("custom:")) {
            styles = themeIdOrCss.slice(7);
        } else {
            const theme = getTheme(themeIdOrCss);
            styles = (await theme?.getCss()) || "";
        }
        updateThemeByCss(styles);
    }

    function updateThemeByCss(themeCss: string) {
        let s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
        if (!s) {
            s = document.createElement("style");
            s.id = "wenyan-theme-style";
            document.head.appendChild(s);
        }
        s.textContent = themeCss;
    }

    async function updateHlTheme(codeblockSettings: CodeblockSettings) {
        const hlThemeId = codeblockSettings.hlThemeId ?? "github";
        const isMacStyle = codeblockSettings.isMacStyle ?? true;
        const fontSize = codeblockSettings.fontSize ?? "12px";
        const fontFamily = codeblockSettings.fontFamily ?? monospace;
        const hlTheme = getHlTheme(hlThemeId);
        const hlStyles = (await hlTheme?.getCss()) || "";
        let s = document.getElementById("wenyan-theme-style") as HTMLStyleElement | null;
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
        updateHlThemeByCss(hlStyles);
        updateMacStyle(isMacStyle);
    }

    function updateHlThemeByCss(hlThemeCss: string) {
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
</script>

<section id="wenyan" class="relative m-auto w-105 outline-none shadow-[0_0_60px_rgba(0,0,0,0.1)] overflow-auto p-5">
    {@html renderer.html}
</section>
