import type { Action } from "svelte/action";

const cache = new Map<string, string>();

export interface ProcessImagesOptions {
    download: (url: string) => Promise<string>;
}

export const processImages: Action<HTMLElement, ProcessImagesOptions> = (node, options) => {
    const run = async () => {
        const images = node.querySelectorAll<HTMLImageElement>("img");

        for (const img of images) {
            const dataSrc = img.getAttribute("src");

            if (dataSrc && dataSrc.startsWith("https://mmbiz.qpic.cn")) {
                const cached = cache.get(dataSrc);
                if (cached) {
                    img.src = cached;
                    continue;
                }
                try {
                    img.setAttribute("data-src", dataSrc);
                    if (options?.download) {
                        const newUrl = await options.download(dataSrc);
                        if (newUrl) {
                            cache.set(dataSrc, newUrl);
                            img.src = newUrl;
                        }
                    }
                } catch (err) {
                    console.error("Image process failed:", dataSrc, err);
                }
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
            cache.clear();
        },
    };
};
