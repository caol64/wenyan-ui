import { setContext, getContext } from "svelte";
import type { Action } from "svelte/action";
import { IMAGE_PROCESSOR_ACTION_KEY, PREVIEW_CLICK_KEY } from "./symbols";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
});

export type ImageProcessorAction = Action<HTMLElement>;

type PreviewClickFn = () => void;

export function setPreviewClick(fn: PreviewClickFn) {
    setContext(PREVIEW_CLICK_KEY, fn);
}

export function getPreviewClick(): PreviewClickFn {
    return getContext<PreviewClickFn>(PREVIEW_CLICK_KEY);
}

export function setImageProcessorAction(fn: ImageProcessorAction) {
    setContext(IMAGE_PROCESSOR_ACTION_KEY, fn);
}

export function getImageProcessorAction(): ImageProcessorAction {
    return getContext<ImageProcessorAction>(IMAGE_PROCESSOR_ACTION_KEY) ?? defaultImageProcessorAction;
}

const defaultImageProcessorAction: ImageProcessorAction = (node) => {
    const run = async () => {
        const images = node.querySelectorAll<HTMLImageElement>("img");
        if (images.length === 0) return;

        for (const img of images) {
            const dataSrc = img.getAttribute("src");

            if (dataSrc && dataSrc.startsWith("https://mmbiz.qpic.cn/")) {
                img.setAttribute("referrerpolicy", "no-referrer");
            }
        }
    };

    const renderMermaid = async () => {
        const preElements = node.querySelectorAll<HTMLPreElement>("pre");
        if (preElements.length === 0) return;

        for (const preElement of preElements) {
            if (preElement.getAttribute("data-mermaid-processed")) {
                continue;
            }
            
            const codeElement = preElement.querySelector<HTMLElement>("code");
            if (!codeElement) continue;
            
            const className = codeElement.className || '';
            const isMermaid = className.includes('language-mermaid') || 
                             className.includes('lang-mermaid') ||
                             codeElement.getAttribute('data-language') === 'mermaid';
            
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
    };

    const runAll = async () => {
        await run();
        await renderMermaid();
    };

    // 首次运行
    runAll();

    const observer = new MutationObserver(() => runAll());

    observer.observe(node, {
        childList: true,
        subtree: true,
    });

    return {
        destroy() {
            observer.disconnect();
        },
    };
};
