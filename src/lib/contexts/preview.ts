import type { ImageProcessorAction } from "../types";
import { defaultProcessImagesAction } from "../services/processImages.svelte";
import { setContext, getContext } from "svelte";

const PREVIEW_CLICK_KEY = Symbol("PREVIEW_CLICK");
const IMAGE_PROCESSOR_ACTION_KEY = Symbol("IMAGE_PROCESSOR_ACTION");

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
    return getContext<ImageProcessorAction>(IMAGE_PROCESSOR_ACTION_KEY) ?? defaultProcessImagesAction;
}
