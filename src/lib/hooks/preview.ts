import { setContext, getContext } from "svelte";
import type { Action } from "svelte/action";
import { IMAGE_PROCESSOR_ACTION_KEY, PREVIEW_CLICK_KEY } from "./symbols";

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

    // 首次运行
    run();

    // 如果内容动态变化，可以用 MutationObserver
    const observer = new MutationObserver(() => run());

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
