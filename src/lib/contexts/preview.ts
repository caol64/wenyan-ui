import { setContext, getContext } from "svelte";

const PREVIEW_CLICK_KEY = Symbol("PREVIEW_CLICK");
const DOWNLOAD_IMAGE_TO_BASE64_KEY = Symbol("DOWNLOAD_IMAGE_TO_BASE64");

type PreviewClickFn = () => void;
type DownloadImageToBase64Fn = (src: string) => Promise<string>;

export function setPreviewClick(fn: PreviewClickFn) {
    setContext(PREVIEW_CLICK_KEY, fn);
}

export function getPreviewClick(): PreviewClickFn {
    return getContext<PreviewClickFn>(PREVIEW_CLICK_KEY);
}

export function setDownloadImageToBase64(fn: DownloadImageToBase64Fn) {
    setContext(DOWNLOAD_IMAGE_TO_BASE64_KEY, fn);
}

export function getDownloadImageToBase64(): DownloadImageToBase64Fn {
    return getContext<DownloadImageToBase64Fn>(DOWNLOAD_IMAGE_TO_BASE64_KEY) ?? (async (src: string) => {
        return src;
    });
}
