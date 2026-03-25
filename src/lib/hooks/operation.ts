import { setContext, getContext } from "svelte";
import { defaultExportImageHandler } from "../services/defaultExportHandler";
import { globalState, wenyanCopier, wenyanRenderer } from "../wenyan.svelte";
import { themeStore } from "../stores/themeStore.svelte";
import { copyHtmlToClipboard, copyTextToClipboard, getWenyanElement } from "../utils";
import { addFootnotes } from "@wenyan-md/core";
import {
    COPY_CLICK_KEY,
    EXPORT_IMAGE_KEY,
    FOOTNOTE_CLICK_KEY,
    GET_WENYAN_ELEMENT_KEY,
    HANDLE_FILE_OPEN_KEY,
    HANDLE_MARKDOWN_CONTENT_KEY,
    IMPORT_CSS_KEY,
    MARKDOWN_FILE_DROP_KEY,
} from "./symbols";

type GetWenyanElementFn = () => HTMLElement;
type CopyClickFn = () => Promise<void>;
type FootnoteClickFn = (isEnabled: boolean) => Promise<void>;
type ExportImageClickFn = () => Promise<void>;
type ImportCssClickFn = (url: string, name: string) => Promise<void>;
type HandleFileOpenFn = (path: string) => Promise<void>;
type MarkdownFileDropFn = () => Promise<void>;
type HandleMarkdownContentFn = (text: string) => Promise<string>;

export function setGetWenyanElement(fn: GetWenyanElementFn) {
    setContext(GET_WENYAN_ELEMENT_KEY, fn);
}

export function getGetWenyanElement(): GetWenyanElementFn {
    return getContext<GetWenyanElementFn>(GET_WENYAN_ELEMENT_KEY) ?? getWenyanElement;
}

export function setCopyClick(fn: CopyClickFn) {
    setContext(COPY_CLICK_KEY, fn);
}

export function getCopyClick(): CopyClickFn {
    return getContext<CopyClickFn>(COPY_CLICK_KEY) ?? defaultCopyHandler;
}

export function setFootnoteClick(fn: FootnoteClickFn) {
    setContext(FOOTNOTE_CLICK_KEY, fn);
}

export function getFootnoteClick(): FootnoteClickFn {
    return getContext<FootnoteClickFn>(FOOTNOTE_CLICK_KEY) ?? defaultFootnoteHandler;
}

export function setExportImageClick(fn: ExportImageClickFn) {
    setContext(EXPORT_IMAGE_KEY, fn);
}

export function getExportImageClick(): ExportImageClickFn {
    return getContext<ExportImageClickFn>(EXPORT_IMAGE_KEY) ?? defaultExportImageHandler;
}

export function setImportCssClick(fn: ImportCssClickFn) {
    setContext(IMPORT_CSS_KEY, fn);
}

export function getImportCssClick(): ImportCssClickFn {
    return (
        getContext<ImportCssClickFn>(IMPORT_CSS_KEY) ??
        (async (url: string, name: string) => {
            const resp = await fetch(url);
            if (!resp.ok) {
                globalState.setAlertMessage({
                    type: "error",
                    title: "导入 CSS 失败",
                    message: `无法从 ${url} 获取 CSS 文件。`,
                });
                return;
            }
            const cssText = await resp.text();
            const themeId = globalState.getCurrentThemeId();
            themeStore.addCustomTheme(`0:${themeId}`, name);
            const currentTheme = globalState.getCurrentTheme();
            currentTheme.name = name;
            currentTheme.css = cssText;
            currentTheme.id = `0:${themeId}`;
            globalState.customThemeName = name;
        })
    );
}

export function setHandleFileOpen(fn: HandleFileOpenFn) {
    setContext(HANDLE_FILE_OPEN_KEY, fn);
}

export function getHandleFileOpen(): HandleFileOpenFn {
    return (
        getContext<HandleFileOpenFn>(HANDLE_FILE_OPEN_KEY) ??
        (async (path: string) => {
            globalState.setAlertMessage({
                type: "info",
                title: "打开文件",
                message: "网页版无法打开本地文件，请使用桌面客户端。",
            });
        })
    );
}

export function setMarkdownFileDrop(fn: MarkdownFileDropFn) {
    setContext(MARKDOWN_FILE_DROP_KEY, fn);
}

export function getMarkdownFileDrop(): MarkdownFileDropFn {
    return getContext<MarkdownFileDropFn>(MARKDOWN_FILE_DROP_KEY);
}

export function setHandleMarkdownContent(fn: HandleMarkdownContentFn) {
    setContext(HANDLE_MARKDOWN_CONTENT_KEY, fn);
}

export function getHandleMarkdownContent(): HandleMarkdownContentFn {
    return getContext<HandleMarkdownContentFn>(HANDLE_MARKDOWN_CONTENT_KEY);
}

async function defaultCopyHandler() {
    if (globalState.getPlatform() === "juejin") {
        copyTextToClipboard(wenyanRenderer.postHandlerContent);
    } else {
        const wenyanElement = getWenyanElement();
        await wenyanCopier.copy(wenyanElement);
        copyHtmlToClipboard(wenyanCopier.html);
    }
}

function defaultFootnoteHandler(isEnabled: boolean) {
    if (isEnabled) {
        const wenyanElement = getWenyanElement();
        addFootnotes(wenyanElement);
        wenyanRenderer.html = wenyanElement.innerHTML;
    } else {
        wenyanRenderer.render(globalState.getMarkdownText());
    }
}
