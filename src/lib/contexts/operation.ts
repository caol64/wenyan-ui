import { setContext, getContext } from "svelte";
import { defaultExportImageHandler } from "../services/exportHandler";
import { globalState } from "../wenyan.svelte";
import { defaultCopyHandler } from "../services/copyHandler";
import { defaultFootnoteHandler } from "../services/footnoteHandler";

const COPY_CLICK_KEY = Symbol("COPY_CLICK");
const FOOTNOTE_CLICK_KEY = Symbol("FOOTNOTE_CLICK");
const EXPORT_IMAGE_KEY = Symbol("EXPORT_IMAGE");
const PUBLISH_ARTICLE_KEY = Symbol("PUBLISH_ARTICLE");

type CopyClickFn = () => void;
type FootnoteClickFn = (isEnabled: boolean) => void;
type ExportImageClickFn = () => void;
type PublishArticleClickFn = () => void;

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

export function setPublishArticleClick(fn: PublishArticleClickFn) {
    setContext(PUBLISH_ARTICLE_KEY, fn);
}

export function getPublishArticleClick(): PublishArticleClickFn {
    return (
        getContext<PublishArticleClickFn>(PUBLISH_ARTICLE_KEY) ??
        (() => {
            globalState.setAlertMessage({
                type: "info",
                title: "文章发布",
                message: "网页版无法使用发布文章到公众号功能，请使用桌面客户端。",
            });
        })
    );
}
