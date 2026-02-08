import { defaultExportImageHandler } from "../services/exportHandler";
import { setContext, getContext } from "svelte";

const EXPORT_IMAGE_KEY = Symbol("EXPORT_IMAGE");

type ExportImageClickFn = () => void;

export function setExportImageClick(fn: ExportImageClickFn) {
    setContext(EXPORT_IMAGE_KEY, fn);
}

export function getExportImageClick(): ExportImageClickFn {
    return getContext<ExportImageClickFn>(EXPORT_IMAGE_KEY) ?? defaultExportImageHandler;
}
