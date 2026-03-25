import { setContext, getContext } from "svelte";
import { globalState } from "../wenyan.svelte";
import { PUBLISH_ARTICLE_KEY, PUBLISH_ARTICLE_TO_DRAFT_KEY, PUBLISH_HELP_KEY } from "./symbols";
import type { WechatPublishOptions, WechatUploadResponse } from "@wenyan-md/core/wechat";

type PublishArticleClickFn = (
    wenyanElement: HTMLElement,
    handlePublishHelpClick: PublishHelpClickFn,
    handleUploadImage: (url: string) => Promise<WechatUploadResponse>,
    handlePublishArticleToDraft: PublishArticleToDraftFn,
) => void;
type PublishHelpClickFn = () => void;
type PublishArticleToDraftFn = (publishOption: WechatPublishOptions) => Promise<string>;

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

export function setPublishHelpClick(fn: PublishHelpClickFn) {
    setContext(PUBLISH_HELP_KEY, fn);
}

export function getPublishHelpClick(): PublishHelpClickFn {
    return (
        getContext<PublishHelpClickFn>(PUBLISH_HELP_KEY) ??
        (() => {
            window.open("https://yuzhi.tech/docs/wenyan/publish", "_blank");
        })
    );
}

export function setPublishArticleToDraft(fn: PublishArticleToDraftFn) {
    setContext(PUBLISH_ARTICLE_TO_DRAFT_KEY, fn);
}

export function getPublishArticleToDraft(): PublishArticleToDraftFn {
    return getContext<PublishArticleToDraftFn>(PUBLISH_ARTICLE_TO_DRAFT_KEY);
}
