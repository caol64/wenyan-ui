<script lang="ts">
    import { settingsStore, type CodeblockSettings, type ParagraphSettings } from "../stores/settingsStore.svelte";
    import { comboCodeblockSettings, comboParagraphSettings } from "../services/stylesCombo";
    import { wenyanRenderer, globalState } from "../wenyan.svelte";
    import { getMacStyleCss } from "@wenyan-md/core";
    import { getImageProcessorAction, getPreviewClick } from "../hooks/preview";
    import mermaid from "mermaid";

    let { scrollRef = $bindable() }: { scrollRef?: HTMLElement | null } = $props();

    const onPreviewClick = getPreviewClick();
    const imageProcessorAction = getImageProcessorAction();

    mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
    });

    $effect(() => {
        wenyanRenderer.render(globalState.getMarkdownText());
        setTimeout(renderMermaid, 100);
    });

    async function renderMermaid() {
        const section = document.getElementById("wenyan");
        if (!section) return;

        const preElements = section.querySelectorAll<HTMLPreElement>("pre");
        for (const preElement of preElements) {
            if (preElement.getAttribute("data-mermaid-processed")) {
                continue;
            }
            
            const codeElement = preElement.querySelector<HTMLElement>("code");
            if (!codeElement) continue;
            
            const className = codeElement.className || '';
            const isMermaid = className.includes('language-mermaid') || 
                             className.includes('lang-mermaid');
            
            if (!isMermaid) continue;
            
            preElement.setAttribute("data-mermaid-processed", "true");

            try {
                const graphDefinition = codeElement.innerText?.trim() || "";
                if (!graphDefinition) continue;

                const { svg } = await mermaid.render("mermaid-" + Math.random().toString(36).substring(2), graphDefinition);
                preElement.innerHTML = svg;
            } catch (error) {
                console.error("Mermaid render error:", error);
                preElement.innerHTML = `<p style="color: red;">Mermaid 语法错误</p>`;
            }
        }
    }

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
        <section id="wenyan" use:imageProcessorAction>
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
