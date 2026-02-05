import { setContext, getContext } from "svelte";

const PREVIEW_CLICK_KEY = Symbol("PREVIEW_CLICK");

type PreviewClickFn = () => void;

export function setPreviewClick(fn: PreviewClickFn) {
    setContext(PREVIEW_CLICK_KEY, fn);
}

export function getPreviewClick(): PreviewClickFn {
    return getContext<PreviewClickFn>(PREVIEW_CLICK_KEY);
}
