import type { CopyContentType } from "$lib/types";
import { setContext, getContext } from "svelte";

const COPY_CLICK_KEY = Symbol("COPY_CLICK");
const GET_WENYAN_ELEMENT_KEY = Symbol("GET_WENYAN_ELEMENT");

type CopyClickFn = (result: string, contentType: CopyContentType) => void;
type GetWenyanElementFn = () => HTMLElement;

export function setCopyClick(fn: CopyClickFn) {
    setContext(COPY_CLICK_KEY, fn);
}

export function getCopyClick(): CopyClickFn {
    return getContext<CopyClickFn>(COPY_CLICK_KEY);
}

export function setGetWenyanElement(fn: GetWenyanElementFn) {
    setContext(GET_WENYAN_ELEMENT_KEY, fn);
}

export function getGetWenyanElement(): GetWenyanElementFn {
    return getContext<GetWenyanElementFn>(GET_WENYAN_ELEMENT_KEY);
}
